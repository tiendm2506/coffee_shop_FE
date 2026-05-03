export const API_BASE_URL = 'http://localhost:3069/api'

export const ROUTES = {
  HOMEPAGE: '/',
  PRODUCTS_PAGE: '/products',
  PRODUCTS_DETAIL_PAGE: '/products/:slug',
  BLOG_PAGE: '/blog',
  ABOUT_PAGE: '/about',
  CONTACT_PAGE: '/contact',
  CHECKOUT_PAGE: '/checkout'
}

export const ADMIN_ROUTES = {
  DASHBOARD: '/admin',
  PRODUCT_ADMIN_PAGE: '/admin/product',
  POST_ADMIN_PAGE: '/admin/post',
  ORDER_ADMIN_PAGE: '/admin/order',
  CLIENT_ADMIN_PAGE: '/admin/client',
  PROMOTION_ADMIN_PAGE: '/admin/promotion'
}

export const API_ENDPOINTS = {
  LOGIN: '/user/login',
  REGISTER: '/user/register',
  REFRESH_TOKEN: '/user/refresh-token',

  CREATE_PRODUCT: '/product/create',
  UPDATE_PRODUCT: '/product/update/:id',
  GET_LIST_PRODUCTS: '/product/list',
  GET_PRODUCT_DETAIL_BY_SLUG: '/product/:slug',
  DELETE_PRODUCT_BY_ID: '/product/remove/:id',

  GET_LIST_CATEGORIES: '/category/list'
}