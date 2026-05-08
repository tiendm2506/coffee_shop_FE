export const API_BASE_URL = 'http://localhost:3069/api'
export const SERVER_BACKEND = 'http://localhost:3069'

export const ROUTES = {
  HOMEPAGE: '/',
  PRODUCTS_PAGE: '/products',
  PRODUCTS_DETAIL_PAGE: '/products/:slug',
  BLOG_PAGE: '/blog',
  ABOUT_PAGE: '/about',
  CONTACT_PAGE: '/contact',
  CHECKOUT_PAGE: '/checkout',
  THANKYOU_PAGE: '/thankyou'
}

export const ADMIN_ROUTES = {
  DASHBOARD: '/admin',
  PRODUCT_ADMIN_PAGE: '/admin/product',
  POST_ADMIN_PAGE: '/admin/post',
  ORDER_ADMIN_PAGE: '/admin/order',
  CLIENT_ADMIN_PAGE: '/admin/client',
  PROMOTION_ADMIN_PAGE: '/admin/promotion',
  CATEGORY_ADMIN_PAGE: '/admin/category'
}

export const API_ENDPOINTS = {
  LOGIN: '/user/login',
  REGISTER: '/user/register',
  REFRESH_TOKEN: '/user/refresh-token',

  CREATE_PRODUCT: '/product/create',
  UPDATE_PRODUCT: '/product/update/:id',
  GET_PRODUCT_DETAIL_BY_SLUG: '/product/:slug',
  DELETE_PRODUCT_BY_ID: '/product/remove/:id',
  GET_LIST_PRODUCTS: '/product/list',

  CREATE_PROMOTION: '/promotion/create',
  UPDATE_PROMOTION: '/promotion/update/:id',
  DELETE_PROMOTION_BY_ID: '/promotion/remove/:id',
  GET_LIST_PROMOTIONS: '/promotion/list',
  CHECK_PROMOTION_CODE: '/promotion/check',

  CREATE_CATEGORY: '/category/create',
  UPDATE_CATEGORY: '/category/update/:id',
  DELETE_CATEGORY_BY_ID: '/category/remove/:id',
  GET_LIST_CATEGORIES: '/category/list',

  CREATE_ORDER: '/order/create',
  UPDATE_ORDER: '/order/update/:id',
  DELETE_ORDER_BY_ID: '/order/remove/:id',
  GET_LIST_ORDERS: '/order/list',


  CREATE_POST: '/post/create',
  UPDATE_POST: '/post/update/:id',
  DELETE_POST_BY_ID: '/post/remove/:id',
  GET_LIST_POSTS: '/post/list',
  GET_POST_DETAIL: '/post/:slug',

  CREATE_CLIENT: '/client/create',
  DELETE_CLIENT_BY_ID: '/client/remove/:id',
  GET_LIST_CLIENTS: '/client/list',

  UPLOAD_IMAGE: '/upload'
}

export const PROMOTION_TYPE = {
  PERCENT: 'PERCENT',
  CASH: 'CASH'
}

export const CATEGORY_TYPE = {
  PRODUCT: 'Product',
  POST: 'Post'
}

export const STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive'
}

export const OERDER_STATUS = {
  NEW: 'New',
  CANCELED: 'Canceled',
  COMPLETED: 'Completed'
}