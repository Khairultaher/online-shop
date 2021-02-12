import axios from 'axios'

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCES,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCES,
  PRODUCT_DETAIL_FAIL,
  CLEAR_ERRORS,
} from '../constants/productConstant'

export const getProducts = (
  keyword = '',
  price,
  category,
  rating = 0,
  currentPage = 1
) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST })
    let url = `/api/v1/products?keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}
    &ratings[gte]=${rating}&page=${currentPage}`
    if (category) {
      url = `/api/v1/products?keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}
      &category=${category}&ratings[gte]=${rating}&page=${currentPage}`
    }
    const data = await axios.get(url)
    dispatch({
      type: ALL_PRODUCT_SUCCES,
      payload: data.data,
    })
  } catch (error) {
    debugger
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.errorMessage,
    })
  }
}

export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST })
    const data = await axios.get(`/api/v1/product/${id}`)
    dispatch({
      type: PRODUCT_DETAIL_SUCCES,
      payload: data.data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.response.data.errorMessage,
    })
  }
}
// clear all error

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}
