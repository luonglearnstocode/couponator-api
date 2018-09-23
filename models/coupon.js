const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const couponSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  acquiredBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

// create a model
const Coupon = mongoose.model('Coupon', couponSchema)

// export the model
module.exports = Coupon
