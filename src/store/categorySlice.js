import { API_ENDPOINTS } from '@/constants'
import apiService from '@/services/apiService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  categoryList: [],
  pagination: {}
}

export const GET_LIST_CATEGORIES = 'CategoryState/GET_LIST_CATEGORIES'
export const getListCategories = createAsyncThunk(
  GET_LIST_CATEGORIES,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_ENDPOINTS.GET_LIST_CATEGORIES, { params })
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(getListCategories.fulfilled, (state, action) => {
      const { categories, pagination } = action.payload
      state.categoryList = categories
      state.pagination = pagination
    })
  }
})

export const selectListCategories = (state) => state.category.categoryList

export default categorySlice.reducer