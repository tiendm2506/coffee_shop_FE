import { API_ENDPOINTS } from '@/constants'
import apiService from '@/services/apiService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  clientList: [],
  pagination: {}
}

export const CREATE_CLIENT = 'ClientState/CREATE_CLIENT'
export const createClient = createAsyncThunk(
  CREATE_CLIENT,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.CREATE_CLIENT, params)
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || 'Create client failed'
        }
      )
    }
  }
)

export const DELETE_CLIENT_BY_ID = 'ClientState/DELETE_CLIENT_BY_ID'
export const deleteClientById = createAsyncThunk(
  DELETE_CLIENT_BY_ID,
  async ({ clientId }, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(API_ENDPOINTS.DELETE_CLIENT_BY_ID.replace(':id', clientId))
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const GET_LIST_CLIENTS = 'ClientState/GET_LIST_CLIENTS'
export const getListClients = createAsyncThunk(
  GET_LIST_CLIENTS,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_ENDPOINTS.GET_LIST_CLIENTS, { params })
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.clientList.unshift(action.payload)
    })
    builder.addCase(deleteClientById.fulfilled, (state, action) => {
      const deletedId = action.meta.arg.clientId
      state.clientList = state.clientList.filter(
        (item) => item._id !== deletedId
      )
    })
    builder.addCase(getListClients.fulfilled, (state, action) => {
      const { clients, pagination } = action.payload
      state.clientList = clients
      state.pagination = pagination
    })
  }
})

export const selectListClients = (state) => state.client.clientList

export default clientSlice.reducer