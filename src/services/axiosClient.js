import axios from 'axios'
import { API_BASE_URL, API_ENDPOINTS } from '@/constants'
import { logout } from '@/store/userSlice'

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

const apiRefreshToken = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token automatically
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle response
axiosClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401) {
      const { store } = await import('@/store')
      store.dispatch(logout())
      return Promise.reject(error)
    }

    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token
            return axiosClient(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const accessToken = localStorage.getItem('accessToken')

        const { data } = await apiRefreshToken.post(
          API_ENDPOINTS.REFRESH_TOKEN,
          {},
          {
            headers: {
              'x-access-token': accessToken,
              'Authorization': `Bearer ${refreshToken}`
            }
          }
        )

        localStorage.setItem('accessToken', data.metaData.accessToken)
        localStorage.setItem('refreshToken', data.metaData.refreshToken)

        processQueue(null, data.metaData.accessToken)

        originalRequest.headers['Authorization'] = 'Bearer ' + data.metaData.accessToken
        return axiosClient(originalRequest)
      } catch (err) {
        processQueue(err, null)
        const { store } = await import('@/store')
        store.dispatch(logout())
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default axiosClient