import axiosClient from './axiosClient'

const apiService = {
  get: (url, config = {}) => axiosClient.get(url, config),
  post: (url, data, config = {}) =>
    axiosClient.post(url, data, config),
  put: (url, data, config = {}) =>
    axiosClient.put(url, data, config),
  delete: (url, config = {}) =>
    axiosClient.delete(url, config)
}

export default apiService