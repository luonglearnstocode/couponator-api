const Purchase = require('../models/purchase')
const Store = require('../models/store')
const User = require('../models/user')

module.exports = {
  getAllPurchases: async (req, res, next) => {
    const purchase = await Purchase.find()
    res.status(200).json(purchase)
  },

  createPurchase: async (req, res, next) => {
    // find store
    const store = await Store.findById(req.value.body.store)
    // find user
    const user = await User.findById(req.value.body.user)
    // create new purchase
    const newPurchase = new Purchase(req.value.body)
    await newPurchase.save()
    // add created purchase to store & user purchases list
    store.purchases.push(newPurchase)
    await store.save()
    user.purchases.push(newPurchase)
    await user.save()

    res.status(201).json(newPurchase)
  },

  getPurchaseById: async (req, res, next) => {
    const { purchaseId } = req.value.params
    const purchase = await Purchase.findById(purchaseId)
    res.status(200).json(purchase)
  },

  updatePurchase: async (req, res, next) => {
    const { purchaseId } = req.value.params
    const purchase = req.value.body

    const result = await Purchase.findByIdAndUpdate(purchaseId, purchase, { new: true })
    res.status(200).json(result)
  },

  deletePurchase: async (req, res, next) => {
    // find purchase
    const { purchaseId } = req.value.params
    const purchase = await Purchase.findById(purchaseId)
    if (!purchase) return res.status(404).json({ error: 'Purchase doesn\'t exist ' })
    // remove purchase from store's purchases list
    const storeId = purchase.store
    const store = await Store.findById(storeId)
    store.purchases.pull(purchase)
    await store.save()
    // remove purchase from user's purchases list
    const userId = purchase.user
    const user = await User.findById(userId)
    user.purchases.pull(purchase)
    await user.save()
    // remove purchase
    await purchase.remove()

    res.sendStatus(200)
  }
}
