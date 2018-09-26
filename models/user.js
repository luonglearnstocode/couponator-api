const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  coupons: [{
    type: Schema.Types.ObjectId,
    ref: 'Coupon'
  }],
  purchases: [{
    type: Schema.Types.ObjectId,
    ref: 'Purchase'
  }],
  lootBoxes: [{
    type: Schema.Types.ObjectId,
    ref: 'LootBox'
  }]
})

// create a model
const User = mongoose.model('User', userSchema)

// export the model
module.exports = User
