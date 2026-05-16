import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'

import storage from './storage'
import loaderReducer from './loaderSlice'
import cartReducer from './cartSlice'
import productSlice from './productSlice'
import categorySlice from './categorySlice'
import promotionSlice from './promotionSlice'
import orderSlice from './orderSlice'
import userSlice from './userSlice'
import notificationSlice from './notificationSlice'
import modalReducer from './modalSlice'
import clientReducer from './clientSlice'
import postReducer from './postSlice'
import uploadReducer from './uploadSlice'

const rootReducer = combineReducers({
  loader: loaderReducer,
  cart: cartReducer,
  product: productSlice,
  category: categorySlice,
  promotion: promotionSlice,
  order: orderSlice,
  user: userSlice,
  notification: notificationSlice,
  modal: modalReducer,
  client: clientReducer,
  post: postReducer,
  upload: uploadReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user', 'notification']
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
