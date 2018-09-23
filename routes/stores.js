const router = require('express-promise-router')()

const { validateBody, validateParam, schemas } = require('../helpers/routeHelpers')
const StoresController = require('../controllers/stores')

router.route('/')
  .get(StoresController.getAllStores)
  .post(validateBody(schemas.storeSchema), StoresController.createStore)

router.route('/:storeId')
  .get(validateParam(schemas.idSchema, 'storeId'), StoresController.getStoreById)
  .patch([validateParam(schemas.idSchema, 'storeId'), validateBody(schemas.storeSchema)],
    StoresController.updateStore)
  .delete(validateParam(schemas.idSchema, 'storeId'), StoresController.deleteStore)

module.exports = router
