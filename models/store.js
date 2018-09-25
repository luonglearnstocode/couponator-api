const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GeoSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
})

const storeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  couponAvailable: {
    type: Boolean,
    default: true
  },
  geometry: GeoSchema,
  coupons: [{
    type: Schema.Types.ObjectId,
    ref: 'Coupon'
  }],
  purchases: [{
    type: Schema.Types.ObjectId,
    ref: 'Purchase'
  }]
})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store
