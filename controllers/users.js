const User = require('../models/user')
const Coupon = require('../models/coupon')

module.exports = {
  getAllUsers: async (req, res, next) => {
    const users = await User.find()
    res.status(200).json(users)
  },

  createUser: async (req, res, next) => {
    const newUser = await new User(req.value.body).save()
    res.status(201).json(newUser)
  },

  getUserById: async (req, res, next) => {
    const { userId } = req.value.params
    const user = await User.findById(userId)
    res.status(200).json(user)
  },

  updateUser: async (req, res, next) => {
    const { userId } = req.value.params
    const user = req.value.body

    const result = await User.findByIdAndUpdate(userId, user, { new: true })
    res.status(200).json(result)
  },

  deleteUser: async (req, res, next) => {
    const { userId } = req.value.params
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ error: 'User doesn\'t exist ' })
    // remove user from his coupons acquiredBy list
    user.coupons.forEach(async couponId => {
      const coupon = await Coupon.findById(couponId)
      coupon.acquiredBy.pull(user)
      await coupon.save()
    })
    await user.remove()
    res.sendStatus(200)
  },

  getUserCoupons: async (req, res, next) => {
    const { userId } = req.value.params
    const user = await User.findById(userId).populate('coupons')
    res.status(200).json(user.coupons)
  }
}
