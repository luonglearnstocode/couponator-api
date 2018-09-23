const Store = require('../models/store')

module.exports = {
  getAllStores: async (req, res, next) => {
    const stores = await Store.find()
    res.status(200).json(stores)
  },

  createStore: async (req, res, next) => {
    const newStore = await new Store(req.value.body).save()
    res.status(201).json(newStore)
  },

  getStoreById: async (req, res, next) => {
    const { storeId } = req.value.params
    const store = await Store.findById(storeId)
    res.status(200).json(store)
  },

  updateStore: async (req, res, next) => {
    const { storeId } = req.value.params
    const store = req.value.body

    const result = await Store.findByIdAndUpdate(storeId, store, { new: true }) // return updated store
    res.status(200).json(result)
  },

  deleteStore: async (req, res, next) => {
    const { storeId } = req.value.params
    const store = await Store.findById(storeId)
    await store.remove()
    res.sendStatus(200)
  }
}
