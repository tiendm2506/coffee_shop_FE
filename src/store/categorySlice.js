import { API_ENDPOINTS } from '@/constants'
import apiService from '@/services/apiService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  categoryList: [],
  pagination: {}
}

export const CREATE_CATEGORY = 'CategoryState/CREATE_CATEGORY'
export const createCategory = createAsyncThunk(
  CREATE_CATEGORY,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.CREATE_CATEGORY, params)
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const DELETE_CATEGORY_BY_ID = 'CategoryState/DELETE_CATEGORY_BY_ID'
export const deleteCategoryById = createAsyncThunk(
  DELETE_CATEGORY_BY_ID,
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(API_ENDPOINTS.DELETE_CATEGORY_BY_ID.replace(':id', categoryId))
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const UPDATE_CATEGORY = 'CategoryState/UPDATE_CATEGORY'
export const updateCategory = createAsyncThunk(
  UPDATE_CATEGORY,
  async ({ categoryId, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(API_ENDPOINTS.UPDATE_CATEGORY.replace(':id', categoryId), data)
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

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
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categoryList.unshift(action.payload)
    })
    builder.addCase(deleteCategoryById.fulfilled, (state, action) => {
      const deletedId = action.meta.arg.categoryId
      state.categoryList = state.categoryList.filter(
        (item) => item._id !== deletedId
      )
    })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const updated = action.payload
      const index = state.categoryList.findIndex(
        (item) => item._id === updated._id
      )
      if (index !== -1) {
        state.categoryList[index] = updated
      }
    })
    builder.addCase(getListCategories.fulfilled, (state, action) => {
      const { categories, pagination } = action.payload
      state.categoryList = categories
      state.pagination = pagination
    })
  }
})

export const selectListCategories = (state) => state.category.categoryList

export default categorySlice.reducer