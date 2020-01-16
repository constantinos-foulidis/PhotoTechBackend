const Joi = require('joi');

module.exports = {
  // POST /api/users
  createProduct: {
    body: {
      productDetail: Joi.string().required(),
      productCode: Joi.string().required(),
      productCategory: Joi.string().required(),
      productSubcategory: Joi.string().required(),
      productPosition: Joi.string().required(),
      productOrder: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateProduct: {
    body: {
      productDetail: Joi.string().required(),
      productCode: Joi.string().required(),
      productCategory: Joi.string().required(),
      productSubcategory: Joi.string().required(),
      productPosition: Joi.string().required(),
      productOrder: Joi.string().required()
    },
    params: {
      productId: Joi.string().required()
    }
  },

};
