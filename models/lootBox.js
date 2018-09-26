const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const lootBoxSchema = new Schema({
  description: String,
  accumulatedValue: {
    type: Number,
    default: 0
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
    ref: 'User',
    required: true
  }
})

// create a model
const LootBox = mongoose.model('LootBox', lootBoxSchema)

// export the model
module.exports = LootBox
