import React, { Fragment, useEffect } from 'react'
import MetaData from './layout/metaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productAction'
import Product from './product/Poduct'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { loading, products, productsCount, error } = useSelector(
    (state) => state.products
  )
  useEffect(() => {
    debugger
    if (error) {
      return alert.error(error)
    }
    dispatch(getProducts())
  }, [dispatch, alert, error])

  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title={'Buy Best Products'}></MetaData>
          {/* <h6 id='products_heading'>Latest Products</h6> */}
          <section id='products' className='container mt-5'>
            <div className='row'>
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home
