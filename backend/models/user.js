const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    maxlength: [100, 'name must not exit 100'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    maxlength: [100, 'email must not exit 100'],
    unique: true,
    validate: [validator.isEmail, 'please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [6, 'password must not be less than 6'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

// encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    nex()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

// compare password
userSchema.methods.comparePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password)
}
// return jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  })
}

module.exports = mongoose.model('user', userSchema)
