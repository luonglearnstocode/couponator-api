const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const couponSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  value: {
    type: Number,
    required: true
  },
  prob: { // the probability to get this voucher
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
  }],
  img: {
    type: String,
    required: true
  }
})

// create a model
const Coupon = mongoose.model('Coupon', couponSchema)

// export the model
module.exports = Coupon
