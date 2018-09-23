const router = require('express-promise-router')()

const { validateBody, validateParam, schemas } = require('../helpers/routeHelpers')
const UsersController = require('../controllers/users')

router.route('/')
  .get(UsersController.getAllUsers)
  .post(validateBody(schemas.userSchema), UsersController.createUser)

router.route('/:userId')
  .get(validateParam(schemas.idSchema, 'userId'), UsersController.getUserById)
  .patch([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userOptionalSchema)],
    UsersController.updateUser)
  .delete(validateParam(schemas.idSchema, 'userId'), UsersController.deleteUser)

module.exports = router