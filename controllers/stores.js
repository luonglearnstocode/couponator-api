const Store = require('../models/store')
const Coupon = require('../models/coupon')

module.exports = {
  getAllStores: async (req, res, next) => {
    const stores = await Store.find()
    res.status(200).json(stores)
  },

  // get nearby stores which are offering coupons
  getNearbyStores: async (req, res, next) => {
    const stores = await Store.aggregate().near({
      near: [parseFloat(req.value.query.lng), parseFloat(req.value.query.lat)],
      maxDistance: 2 / 6371, // within 2km (6371 is the earth radius in km)
      spherical: true,
      distanceField: 'dist.calculated'
    })
    const storesWithCoupons = stores.filter(store => store.couponAvailable)
    res.status(200).json(storesWithCoupons)
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
    await Coupon.find({ store: storeId }).remove() // remove coupons offered by this store
    await store.remove()
    res.sendStatus(200)
  },

  getStoreCoupons: async (req, res, next) => {
    const { storeId } = req.value.params
    const store = await Store.findById(storeId).populate('coupons')
    res.status(200).json(store.coupons)
  },

  addStoreCoupon: async (req, res, next) => {
    const { storeId } = req.value.params
    const newCoupon = new Coupon(req.value.body) // create new coupon
    const store = await Store.findById(storeId) // get store
    newCoupon.store = store // assign store as seller of the coupon
    await newCoupon.save() // save new coupon
    store.coupons.push(newCoupon) // add coupon to store's coupons list
    await store.save() // save store
    res.status(201).json(newCoupon)
  }
}
