import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true
    },
    closeCart: (state) => {
      state.isOpen = false
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    addToCart: (state, action) => {
      const { product, quantity } = action.payload
      const existingItem = state.items.find(
        (item) => item._id === product._id
      )
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({
          ...product,
          quantity
        })
      }
    },

    removeProductFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      )
    },

    clearCart: (state) => {
      state.items = []
    },

    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload

      const item = state.items.find((item) => item._id === _id)

      if (item) {
        item.quantity = quantity
      }
    }

  }
})

export const {
  openCart, closeCart, toggleCart,
  addToCart, removeProductFromCart, clearCart, updateQuantity
} = cartSlice.actions


export default cartSlice.reducer