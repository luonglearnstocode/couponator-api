const router = require('express-promise-router')() // https://www.npmjs.com/package/express-promise-router
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers')

const CouponsController = require('../controllers/coupons')

router.route('/')
  .get(CouponsController.getAllCoupons)
  .post(validateBody(schemas.newCouponSchema), CouponsController.createCoupon)

router.route('/:couponId')
  .get(validateParam(schemas.idSchema, 'couponId'), CouponsController.getCouponById)
  .patch([validateParam(schemas.idSchema, 'couponId'), validateBody(schemas.patchCouponSchema)],
    CouponsController.updateCoupon)
  .delete(validateParam(schemas.idSchema, 'couponId'), CouponsController.deleteCoupon)

module.exports = router
