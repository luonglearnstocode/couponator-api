const Joi = require('joi') // https://github.com/hapijs/joi

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({ param: req.params[name] }, schema)
      if (result.error) {
        return res.status(400).json(result.error)
      } else {
        if (!req.value) req.value = {}
        if (!req.value['params']) req.value['params'] = {}

        req.value['params'][name] = result.value.param
        next()
      }
    }
  },

  validateQuery: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.query, schema)
      if (result.error) {
        return res.status(400).json(result.error)
      } else {
        if (!req.value) req.value = {}
        if (!req.value['query']) req.value['query'] = {}

        req.value['query'] = result.value
        next()
      }
    }
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema)
      if (result.error) {
        return res.status(400).json(result.error)
      } else {
        if (!req.value) req.value = {}
        if (!req.value['body']) req.value['body'] = {}

        req.value['body'] = result.value
        next()
      }
    }
  },

  schemas: {
    userSchema: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    userOptionalSchema: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string()
    }),
    storeSchema: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string(),
      couponAvailable: Joi.boolean(),
      lootBoxPrice: Joi.number().min(0).required(),
      img: Joi.string().uri().required(),
      geometry: Joi.object()
        .keys({
          type: Joi.string(),
          coordinates: Joi.array().items(Joi.number()).length(2)
        }).required()
    }),
    patchStoreSchema: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string(),
      couponAvailable: Joi.boolean(),
      lootBoxPrice: Joi.number().min(0),
      img: Joi.string().uri(),
      geometry: Joi.object()
        .keys({
          type: Joi.string(),
          coordinates: Joi.array().items(Joi.number()).length(2)
        })
    }),
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    storeNearbyQuerySchema: Joi.object().keys({
      lng: Joi.number().required(),
      lat: Joi.number().required()
    }),
    couponSchema: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string(),
      value: Joi.number().min(0).required(),
      prob: Joi.number().min(0).max(1).required()
    }),
    newCouponSchema: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string(),
      value: Joi.number().min(0).required(),
      prob: Joi.number().min(0).max(1).required(),
      store: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      img: Joi.string().uri().required()
    }),
    patchCouponSchema: Joi.object().keys({
      title: Joi.string(),
      description: Joi.string(),
      value: Joi.number().min(0),
      prob: Joi.number().min(0).max(1),
      img: Joi.string().uri()
    }),
    claimCouponSchema: Joi.object().keys({
      user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    purchaseSchema: Joi.object().keys({
      price: Joi.number().min(0).required(),
      store: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    patchPurchaseSchema: Joi.object().keys({ // only allow update price
      price: Joi.number().min(0).required()
    }),
    lootBoxSchema: Joi.object().keys({
      description: Joi.string(),
      store: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    patchLootBoxSchema: Joi.object().keys({
      description: Joi.string()
    })
  }
}
