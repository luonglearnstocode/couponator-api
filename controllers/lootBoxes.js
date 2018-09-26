const LootBox = require('../models/lootBox')
const Store = require('../models/store')
const User = require('../models/user')
const Coupon = require('../models/coupon')

module.exports = {
  getAllLootBoxes: async (req, res, next) => {
    const lootBoxes = await LootBox.find()
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
  },

  openLootBox: async (req, res, next) => {
    // find lootbox
    const { lootBoxId } = req.value.params
    const lootBox = await LootBox.findById(lootBoxId)
    if (!lootBox) return res.status(404).json({ error: 'LootBox doesn\'t exist ' })

    // check if loot box is ready to open
    if (lootBox.progress < 1) return res.status(400).json({ error: 'Loot Box not ready to open yet' })
    // update lootbox values
    const storeId = lootBox.store
    const store = await Store.findById(storeId)
    lootBox.accumulatedValue -= store.lootBoxPrice
    lootBox.progress = lootBox.accumulatedValue / store.lootBoxPrice
    await lootBox.save()

    // get user
    const userId = lootBox.user
    const user = await User.findById(userId)

    const rewards = [] // list of coupons that user will get
    // for each coupon from store's coupons list

    for (const couponId of store.coupons) {
      const coupon = await Coupon.findById(couponId)
      if (Math.random() < coupon.prob) { // user will get coupon
        coupon.acquiredBy.push(user)
        await coupon.save()
        user.coupons.push(couponId)
        await user.save()
        rewards.push(coupon) // add coupon to rewards list
      }
    }
    res.status(200).json(rewards)
  }
}
