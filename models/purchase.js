const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const purchaseSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    required: true
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  }
})

// create a model
const Purchase = mongoose.model('Purchase', purchaseSchema)

// export the model
module.exports = Purchase
