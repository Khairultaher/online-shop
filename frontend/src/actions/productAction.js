import axios from 'axios'

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCES,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from '../constants/productConstant'

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST })
    const data = await axios.get('/api/v1/products')
    debugger
    dispatch({
      type: ALL_PRODUCT_SUCCES,
      payload: data.data,
    })
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// clear all error

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}
