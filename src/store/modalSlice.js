import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  name: null,
  type: null,
  data: null,
  props: {}
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.name = action.payload.name
      state.type = action.payload.type
      state.data = action.payload.data || null
      state.props = action.payload.props || {}
    },
    closeModal: (state) => {
      state.isOpen = false
      state.name = null
      state.type = null
      state.data = null
      state.props = {}
    }
  }
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer