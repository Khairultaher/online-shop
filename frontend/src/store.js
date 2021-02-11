import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer, productDetailReducer } from './reducers/productReducer'

const reducer = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
})

let initiateState = {}
const middleware = [thunk]
const store = createStore(
  reducer,
  initiateState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
