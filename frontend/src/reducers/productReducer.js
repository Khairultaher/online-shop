import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCES,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from '../constants/productConstant'

export const productReducer = (state = { products: [] }, action) => {
  //debugger
  console.log(action.payload)
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
