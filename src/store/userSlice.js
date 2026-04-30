import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '@/services/apiService'
import { API_ENDPOINTS } from '@/constants'

const initialState = {
  accessToken: null
}

export const REGISTER_ACCOUNT = 'UserState/REGISTER_ACCOUNT'
export const registerAccount = createAsyncThunk(
  REGISTER_ACCOUNT,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.REGISTER, params)
      if (!response.success) return rejectWithValue(response.metaData)
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const LOGIN = 'UserState/LOGIN'
export const login = createAsyncThunk(
  LOGIN,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.LOGIN, params)
      if (!response.success) return rejectWithValue(response.metaData)
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const REFRESH_TOKEN = 'UserState/REFRESH_TOKEN'
export const refreshToken = createAsyncThunk(
  REFRESH_TOKEN,
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.REFRESH_TOKEN)
      if (!response.success) return rejectWithValue(response.metaData)
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload
    },
    logout: (state) => {
      state.accessToken = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken
    })
  }
})

export const { setToken, logout } = userSlice.actions
export default userSlice.reducer