import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCES,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCES,
  PRODUCT_DETAIL_FAIL,
  CLEAR_ERRORS,
} from '../constants/productConstant'

export const productReducer = (state = { products: [] }, action) => {
  //debugger
  //console.log(action.payload)
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return { loading: true, products: [] }
    case ALL_PRODUCT_SUCCES:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
      }
    case ALL_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    case CLEAR_ERRORS:
      return { ...state, error: null }
    default:
      return state
  }
}

export const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAIL_SUCCES:
      return {
        loading: false,
        product: action.payload.product,
      }
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    case CLEAR_ERRORS:
      return { ...state, error: null }
    default:
      return state
  }
}
