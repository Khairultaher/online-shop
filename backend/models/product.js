const mongoose = require('mongoose')

const product = new mongoose.Schema({
  name: {
    type: string,
    required: [true, 'name is required'],
    trim: true,
    maxlength: [100, 'name must not exit 100'],
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
    maxlength: [5, 'price must not exit 5'],
    default: 0.0,
  },
  description: {
    type: string,
    required: [true, 'description is required'],
  },
  ratings: {
    type: Number,
    default: 0.0,
  },
  images: [
    {
      public_id: {
        type: string,
        required: true,
      },
      url: {
        type: string,
        required: true,
      },
    },
  ],
  category: {
    type: string,
    required: [true, 'name is required'],
    enum: {
      values: [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Cloths/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home',
        '',
        '',
      ],
      message: 'select correct category',
    },
  },
  seller: {
    type: string,
    required: [true, 'enter product seller'],
  },
  stock: {
    type: Number,
    required: [true, 'enter product stock'],
    maxlength: [5, 'price must not exit 5'],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: string,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: string,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.Now,
  },
})

module.exports = mongoose.model(product)
