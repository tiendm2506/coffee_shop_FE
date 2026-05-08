import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count: 0,
  items: []
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.count += 1
      state.items.unshift(action.payload)
    },
    resetNotification: (state) => {
      state.count = 0
      state.items = []
    }
  }
})

export const { addNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer