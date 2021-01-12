const dotenv = require('dotenv')
const connetDatabase = require('../config/database')
const Product = require('../models/product')
const { connect } = require('mongoose')
const products = require('../data/products')

// setting dotenv file
dotenv.config({ path: 'backend/config/config.env' })

connetDatabase()

const seedProducts = async () => {
  try {
    await Product.deleteMany()
    console.log('Products are deleted...')

    await Product.insertMany(products)
    console.log('All product are added..')

    process.exit()
  } catch (error) {
    console.log(error)
    process.exit()
  }
}

seedProducts()
