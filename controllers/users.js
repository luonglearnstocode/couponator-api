const User = require('../models/user')

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

    const result = await User.findByIdAndUpdate(userId, user)
    res.status(200).json(result)
  },

  deleteUser: async (req, res, next) => {
    const { userId } = req.value.params
    const user = await User.findById(userId)
    await user.remove()
    res.sendStatus(200)
  }
}
