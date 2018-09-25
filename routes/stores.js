const router = require('express-promise-router')()

const { validateBody, validateParam, validateQuery, schemas } = require('../helpers/routeHelpers')
const StoresController = require('../controllers/stores')

router.route('/')
  .get(StoresController.getAllStores)
  .post(validateBody(schemas.storeSchema), StoresController.createStore)

router.route('/near')
  .get(validateQuery(schemas.storeNearbyQuerySchema), StoresController.getNearbyStores)

router.route('/:storeId')
  .get(validateParam(schemas.idSchema, 'storeId'), StoresController.getStoreById)
  .patch([validateParam(schemas.idSchema, 'storeId'), validateBody(schemas.patchStoreSchema)],
    StoresController.updateStore)
  .delete(validateParam(schemas.idSchema, 'storeId'), StoresController.deleteStore)

router.route('/:storeId/coupons')
  .get(validateParam(schemas.idSchema, 'storeId'), StoresController.getStoreCoupons)
  .post([validateParam(schemas.idSchema, 'storeId'), validateBody(schemas.couponSchema)], StoresController.addStoreCoupon)

router.route('/:storeId/purchases')
  .get(validateParam(schemas.idSchema, 'storeId'), StoresController.getStorePurchases)

module.exports = router
