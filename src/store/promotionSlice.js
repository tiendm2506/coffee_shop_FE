import { API_ENDPOINTS } from '@/constants'
import apiService from '@/services/apiService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  promotionList: [],
  pagination: {}
}

export const CREATE_PROMOTION = 'PromotionState/CREATE_PROMOTION'
export const createPromotion = createAsyncThunk(
  CREATE_PROMOTION,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.CREATE_PROMOTION, params)
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || 'Something went wrong'
        }
      )
    }
  }
)

export const DELETE_PROMOTION_BY_ID = 'PromotionState/DELETE_PROMOTION_BY_ID'
export const deletePromotionById = createAsyncThunk(
  DELETE_PROMOTION_BY_ID,
  async ({ promotionId }, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(API_ENDPOINTS.DELETE_PROMOTION_BY_ID.replace(':id', promotionId))
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const UPDATE_PROMOTION = 'PromotionState/UPDATE_PROMOTION'
export const updatePromotion = createAsyncThunk(
  UPDATE_PROMOTION,
  async ({ promotionId, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(API_ENDPOINTS.UPDATE_PROMOTION.replace(':id', promotionId), data)
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const GET_LIST_PROMOTIONS = 'PromotionState/GET_LIST_PROMOTIONS'
export const getListPromotions = createAsyncThunk(
  GET_LIST_PROMOTIONS,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_ENDPOINTS.GET_LIST_PROMOTIONS, { params })
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const CHECK_PROMOTION_CODE = 'PromotionState/CHECK_PROMOTION_CODE'
export const checkPromotionCode = createAsyncThunk(
  CHECK_PROMOTION_CODE,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.CHECK_PROMOTION_CODE, params)
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || 'Something went wrong'
        }
      )
    }
  }
)

const promotionSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(createPromotion.fulfilled, (state, action) => {
      state.promotionList.unshift(action.payload)
    })
    builder.addCase(deletePromotionById.fulfilled, (state, action) => {
      const deletedId = action.meta.arg.promotionId
      state.promotionList = state.promotionList.filter(
        (item) => item._id !== deletedId
      )
    })
    builder.addCase(updatePromotion.fulfilled, (state, action) => {
      const updated = action.payload
      const index = state.promotionList.findIndex(
        (item) => item._id === updated._id
      )
      if (index !== -1) {
        state.promotionList[index] = updated
      }
    })
    builder.addCase(getListPromotions.fulfilled, (state, action) => {
      const { promotions, pagination } = action.payload
      state.promotionList = promotions
      state.pagination = pagination
    })
  }
})

export const selectListPromotions = (state) => state.promotion.promotionList

export default promotionSlice.reducer