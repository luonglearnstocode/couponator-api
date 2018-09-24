const Coupon = require('../models/coupon')
const Store = require('../models/store')
const User = require('../models/user')

module.exports = {
  getAllCoupons: async (req, res, next) => {
    const coupons = await Coupon.find()
    res.status(200).json(coupons)
  },

  createCoupon: async (req, res, next) => {
    // find the store
    const store = await Store.findById(req.value.body.store)
    // create new coupon
    const newCoupon = new Coupon(req.value.body)
    // newCoupon.store = store
    await newCoupon.save()
    // add created coupon to store
    store.coupons.push(newCoupon)
    await store.save()

    res.status(201).json(newCoupon)
  },

  getCouponById: async (req, res, next) => {
    const { couponId } = req.value.params
    const coupon = await Coupon.findById(couponId)
    res.status(200).json(coupon)
  },

  updateCoupon: async (req, res, next) => {
    const { couponId } = req.value.params
    const coupon = req.value.body

    const result = await Coupon.findByIdAndUpdate(couponId, coupon, { new: true })
    res.status(200).json(result)
  },

  claimCoupon: async (req, res, next) => {
    // get coupon
    const { couponId } = req.value.params
    const coupon = await Coupon.findById(couponId)
    if (!coupon) return res.status(404).json({ error: 'Coupon doesn\'t exist ' })
    // find the user
    const user = await User.findById(req.value.body.user)
    if (!user) return res.status(404).json({ error: 'User doesn\'t exist ' })
    // add user to coupon's acquiredBy array
    coupon.acquiredBy.push(user)
    await coupon.save()
    // add coupon to user's coupons list
    user.coupons.push(coupon)
    await user.save()

    res.sendStatus(200)
  },

  deleteCoupon: async (req, res, next) => {
    // find coupon
    const { couponId } = req.value.params
    const coupon = await Coupon.findById(couponId)
    if (!coupon) return res.status(404).json({ error: 'Coupon doesn\'t exist ' })
    // find store
    const storeId = coupon.store
    const store = await Store.findById(storeId)
    // remove coupon from any user owns it
    coupon.acquiredBy.forEach(async (userId) => {
      const user = await User.findById(userId)
      user.coupons.pull(coupon)
      await user.save()
    })
    // remove coupon from store's coupons list
    store.coupons.pull(coupon)
    await store.save()
    // remove coupon
    await coupon.remove()

    res.sendStatus(200)
  }
}
