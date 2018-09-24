const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const lootBoxSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  accumulatedValue: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  progress: {
    type: Number,
    default: 0
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

// create a model
const LootBox = mongoose.model('LootBox', lootBoxSchema)

// export the model
module.exports = LootBox
