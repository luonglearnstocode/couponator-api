const Coupon = require('../models/coupon')
const Store = require('../models/store')

module.exports = {
  getAllCoupons: async (req, res, next) => {
    const coupons = await Coupon.find()
    res.status(200).json(coupons)
  },

  createCoupon: async (req, res, next) => {
    // find the store
    const store = await Store.findById(req.body.store)
    // create new coupon
    const newCoupon = new Coupon(req.body)
    newCoupon.store = store
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

  deleteCoupon: async (req, res, next) => {
    const { couponId } = req.value.params
    const coupon = await Coupon.findById(couponId)
    if (!coupon) return res.status(404).json({ error: 'Coupon doesn\'t exist ' })
    const storeId = coupon.store
    const store = await Store.findById(storeId)

    await coupon.remove()
    store.coupons.pull(coupon)
    await store.save()

    res.sendStatus(200)
  }
}
