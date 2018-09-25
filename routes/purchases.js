const router = require('express-promise-router')() // https://www.npmjs.com/package/express-promise-router
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers')

const PurchasesController = require('../controllers/purchases')

router.route('/')
  .get(PurchasesController.getAllPurchases)
  .post(validateBody(schemas.purchaseSchema), PurchasesController.createPurchase)

router.route('/:purchaseId')
  .get(validateParam(schemas.idSchema, 'purchaseId'), PurchasesController.getPurchaseById)
  .patch([validateParam(schemas.idSchema, 'purchaseId'), validateBody(schemas.patchPurchaseSchema)],
    PurchasesController.updatePurchase)
  .delete(validateParam(schemas.idSchema, 'purchaseId'), PurchasesController.deletePurchase)

module.exports = router
