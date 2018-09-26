const lootBox = require('../models/lootBox')
const LootBox = require('../models/lootBox')
const Store = require('../models/store')
const User = require('../models/user')

module.exports = {
  getAllLootBoxes: async (req, res, next) => {
    const lootBoxes = await lootBox.find()
    res.status(200).json(lootBoxes)
  },

  createLootBox: async (req, res, next) => {
    // find store
    const store = await Store.findById(req.value.body.store)
    // find user
    const user = await User.findById(req.value.body.user)
    // create new loot box
    const newLootBox = new LootBox(req.value.body)
    await newLootBox.save()
    // add created lootbox to store & user lootboxes list
    store.lootBoxes.push(newLootBox)
    await store.save()
    user.lootBoxes.push(newLootBox)
    await user.save()

    res.status(201).json(newLootBox)
  },

  getLootBoxById: async (req, res, next) => {
    const { lootBoxId } = req.value.params
    const lootBox = await LootBox.findById(lootBoxId)
    res.status(200).json(lootBox)
  },

  updateLootBox: async (req, res, next) => {
    const { lootBoxId } = req.value.params
    const lootBox = req.value.body

    const result = await LootBox.findByIdAndUpdate(lootBoxId, lootBox, { new: true })
    res.status(200).json(result)
  },

  deleteLootBox: async (req, res, next) => {
    // find lootbox
    const { lootBoxId } = req.value.params
    const lootBox = await LootBox.findById(lootBoxId)
    if (!lootBox) return res.status(404).json({ error: 'LootBox doesn\'t exist ' })
    // remove lootBox from store's lootBoxes list
    const storeId = lootBox.store
    const store = await Store.findById(storeId)
    store.lootBoxes.pull(lootBox)
    await store.save()
    // remove lootBox from user's lootBoxes list
    const userId = lootBox.user
    const user = await User.findById(userId)
    user.lootBoxes.pull(lootBox)
    await user.save()
    // remove lootBox
    await lootBox.remove()

    res.sendStatus(200)
  }
}
