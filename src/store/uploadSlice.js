import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '@/services/apiService'

export const uploadImages = createAsyncThunk(
  'upload/uploadImages',
  async (files, { rejectWithValue }) => {
    try {
      const formData = new FormData()

      files.forEach(file => {
        formData.append('uploads', file)
      })

      const response = await apiService.post(
        '/upload/images',
        formData,
        {
          headers: {
            'Content-Type':'multipart/form-data'
          }
        }
      )

      if (!response.success) {
        return rejectWithValue(response)
      }

      return response.images
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

const uploadSlice = createSlice({
  name: 'upload',

  initialState: {
    loading: false,
    images: [],
    error: null
  },

  reducers: {
    clearUploadedImages: (state) => {
      state.images = []
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.loading = true
      })

      .addCase(uploadImages.fulfilled, (state, action) => {
        state.loading = false
        state.images = action.payload
      })

      .addCase(uploadImages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearUploadedImages } = uploadSlice.actions

export default uploadSlice.reducer