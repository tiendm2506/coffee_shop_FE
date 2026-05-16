import { API_ENDPOINTS } from '@/constants'
import apiService from '@/services/apiService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  postList: [],
  postDetail: null,
  highlightPosts: [],
  pagination: {}
}

export const CREATE_POST = 'PostState/CREATE_POST'
export const createPost = createAsyncThunk(
  CREATE_POST,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.CREATE_POST, params)
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || 'Create post failed'
        }
      )
    }
  }
)

export const UPDATE_POST = 'PostState/UPDATE_POST'
export const updatePost = createAsyncThunk(
  UPDATE_POST,
  async ({ postId, ...params }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(API_ENDPOINTS.UPDATE_POST.replace(':id', postId), params)
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || 'Update post failed'
        }
      )
    }
  }
)

export const DELETE_POST_BY_ID = 'PostState/DELETE_POST_BY_ID'
export const deletePostById = createAsyncThunk(
  DELETE_POST_BY_ID,
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(API_ENDPOINTS.DELETE_POST_BY_ID.replace(':id', postId))
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const GET_LIST_POSTS = 'PostState/GET_LIST_POSTS'
export const getListPosts = createAsyncThunk(
  GET_LIST_POSTS,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_ENDPOINTS.GET_LIST_POSTS, { params })
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const GET_POST_DETAIL_BY_SLUG = 'PostState/GET_POST_DETAIL_BY_SLUG'
export const getPostDetailBySlug = createAsyncThunk(
  GET_POST_DETAIL_BY_SLUG,
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_ENDPOINTS.GET_POST_DETAIL_BY_SLUG.replace(':slug', slug))
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message:error.message | 'Get post detail failed'
        }
      )
    }
  }
)

export const GET_POST_DETAIL_BY_ID = 'PostState/GET_POST_DETAIL_BY_ID'
export const getPostDetailById = createAsyncThunk(
  GET_POST_DETAIL_BY_ID,
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_ENDPOINTS.GET_POST_DETAIL_BY_ID.replace(':id', id))
      if (!response.success) {
        return rejectWithValue(response.metaData)
      }
      return response.metaData
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || 'Get post detail failed'
        }
      )
    }
  }
)

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers:{
    clearPostDetail: (state) => {
      state.postDetail = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.postList.unshift(action.payload)
    })
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.postDetail =action.payload
      const index =
      state.postList.findIndex( (item) => item._id ===action.payload._id)
      if (index !== -1) {
        state.postList[index ] = action.payload
      }
    }
    )
    builder.addCase(deletePostById.fulfilled, (state, action) => {
      const deletedId = action.meta.arg.postId
      state.postList = state.postList.filter(
        (item) => item._id !== deletedId
      )
    })
    builder.addCase(getListPosts.fulfilled, (state, action) => {
      const { posts, pagination } = action.payload
      if (action.meta.arg?.highlight === true) {
        state.highlightPosts = posts
      } else {
        state.postList = posts
        state.pagination = pagination
      }
    })
    builder.addCase(getPostDetailBySlug.fulfilled, (state, action) => {
      state.postDetail = action.payload
    })
    builder.addCase(getPostDetailById.fulfilled, (state, action) => {
      state.postDetail = action.payload
    })
  }
})

export const selectListPosts = (state) => state.post.postList
export const selectHighlightPosts = (state) => state.post.highlightPosts
export const selectPostDetail = (state) => state.post.postDetail
export const { clearPostDetail } = postSlice.actions

export default postSlice.reducer