import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '@/services/apiService'
import { API_ENDPOINTS } from '@/constants'

const initialState = {
  loading: false,
  orderList: [],
  pagination: {},
  error: null
}

export const CREATE_ORDER = 'OrderState/CREATE_ORDER'
export const createOrder = createAsyncThunk(
  CREATE_ORDER,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.CREATE_ORDER, data)
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || 'Create order failed'
        }
      )
    }
  }
)

export const UPDATE_ORDER = 'OrderState/UPDATE_ORDER'
export const updateOrder = createAsyncThunk(
  UPDATE_ORDER,
  async ({ orderId, order_status }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(API_ENDPOINTS.UPDATE_ORDER.replace(':id', orderId), { order_status })
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || 'Update order failed'
        }
      )
    }
  }
)


export const DELETE_ORDER_BY_ID = 'OrderState/DELETE_ORDER_BY_ID'
export const deleteOrderById = createAsyncThunk(
  DELETE_ORDER_BY_ID,
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(API_ENDPOINTS.DELETE_ORDER_BY_ID.replace(':id', orderId))
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const GET_LIST_ORDERS = 'OrderState/GET_LIST_ORDERS'
export const getListOrders = createAsyncThunk(
  GET_LIST_ORDERS,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_ENDPOINTS.GET_LIST_ORDERS, { params })
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.loading = false
      state.orderList = []
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orderList = action.payload.orders
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error
      })
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      const updated = action.payload
      const index = state.orderList.findIndex(
        (item) => item._id === updated._id
      )
      if (index !== -1) {
        state.orderList[index] = updated
      }
    })
    builder.addCase(deleteOrderById.fulfilled, (state, action) => {
      const deletedId = action.meta.arg.orderId
      state.orderList = state.orderList.filter(
        (item) => item._id !== deletedId
      )
    })
    builder.addCase(getListOrders.fulfilled, (state, action) => {
      state.orderList = action.payload.orders
    })
  }
})

export const { resetOrderState } = orderSlice.actions
export const selectListOrders = (state) => state.order.orderList
export default orderSlice.reducer