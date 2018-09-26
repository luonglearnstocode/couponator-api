const router = require('express-promise-router')() // https://www.npmjs.com/package/express-promise-router
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers')

const LootBoxesController = require('../controllers/lootBoxes')

router.route('/')
  .get(LootBoxesController.getAllLootBoxes)
  .post(validateBody(schemas.lootBoxSchema), LootBoxesController.createLootBox)

router.route('/:lootBoxId')
  .get(validateParam(schemas.idSchema, 'lootBoxId'), LootBoxesController.getLootBoxById)
  .patch([validateParam(schemas.idSchema, 'lootBoxId'), validateBody(schemas.patchLootBoxSchema)],
    LootBoxesController.updateLootBox)
  .delete(validateParam(schemas.idSchema, 'lootBoxId'), LootBoxesController.deleteLootBox)

router.route('/:lootBoxId/open')
  .get(validateParam(schemas.idSchema, 'lootBoxId'), LootBoxesController.openLootBox)

module.exports = router
