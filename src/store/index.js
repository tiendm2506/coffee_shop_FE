import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from './storage'
import loaderReducer from './loaderSlice'
import modalReducer from './modalSlice'
import cartReducer from './cartSlice'
import productSlice from './productSlice'
import categorySlice from './categorySlice'
import userSlice from './userSlice'


// combine reducers
const rootReducer = combineReducers({
  loader: loaderReducer,
  cart: cartReducer,
  product: productSlice,
  category: categorySlice,
  user: userSlice,
  modal: modalReducer
})

// config persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user']
}

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)
