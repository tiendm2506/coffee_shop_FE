import { API_ENDPOINTS } from '@/constants'
import apiService from '@/services/apiService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  productList: [],
  highlightProducts: [],
  pagination: {},
  currentProduct: {}
}

export const CREATE_PRODUCT = 'ProductState/CREATE_PRODUCT'
export const createProduct = createAsyncThunk(
  CREATE_PRODUCT,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.CREATE_PRODUCT, params)
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const UPDATE_PRODUCT = 'ProductState/UPDATE_PRODUCT'
export const updateProduct = createAsyncThunk(
  UPDATE_PRODUCT,
  async ({productId, data}, { rejectWithValue }) => {
    console.log('productId: ', productId)
    try {
      const response = await apiService.put(API_ENDPOINTS.UPDATE_PRODUCT.replace(':id', productId), data)
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const GET_LIST_PRODUCTS = 'ProductState/GET_LIST_PRODUCTS'
export const getListProducts = createAsyncThunk(
  GET_LIST_PRODUCTS,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_ENDPOINTS.GET_LIST_PRODUCTS, { params })
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const GET_PRODUCT_DETAIL_BY_SLUG = 'ProductState/GET_PRODUCT_DETAIL_BY_SLUG'
export const getProductDetailBySlug = createAsyncThunk(
  GET_PRODUCT_DETAIL_BY_SLUG,
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_ENDPOINTS.GET_PRODUCT_DETAIL_BY_SLUG.replace(':slug', slug))
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const DELETE_PRODUCT_BY_ID = 'ProductState/DELETE_PRODUCT_BY_ID'
export const deleteProductById = createAsyncThunk(
  DELETE_PRODUCT_BY_ID,
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(API_ENDPOINTS.DELETE_PRODUCT_BY_ID.replace(':id', productId))
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(getListProducts.fulfilled, (state, action) => {
      const { products, pagination } = action.payload
      if (action.meta.arg?.highlight === true) {
        state.highlightProducts = products
      } else {
        state.productList = products
        state.pagination = pagination
      }
    })
    builder.addCase(getProductDetailBySlug.fulfilled, (state, action) => {
      state.currentProduct = action.payload
    })
    builder.addCase(deleteProductById.fulfilled, (state, action) => {
      const deletedId = action.meta.arg.productId
      state.productList = state.productList.filter(
        (item) => item._id !== deletedId
      )
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.productList.unshift(action.payload)
    })
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const updated = action.payload
      const index = state.productList.findIndex(
        (item) => item._id === updated._id
      )
      if (index !== -1) {
        state.productList[index] = updated
      }
    })
  }
})

export const selectListProducts = (state) => state.product.productList
export const selectHighlightProducts = (state) => state.product.highlightProducts
export const selectCurrentProduct = (state) => state.product.currentProduct

export default productSlice.reducer