const Joi = require('joi');
/**
 * get spesific sellers
 * @property {string} req.body.sellername - The sellername of seller.
 * @property {string} req.body.fullname - The mobileNumber of seller.
 * @property {string} req.body.email - The sellername of seller.
 * @property {string} req.body.password - The sellername of seller.
 * @property {string} req.body.region - The mobileNumber of seller.
 * @property {string} req.body.amount - The sellername of seller.
 * @property {string} req.body.sallerCode - The mobileNumber of seller.
 * @returns {seller}
 */
module.exports = {
  // POST /api/sellers
  createseller: {
    body: {
      sellername: Joi.string().required(),
      fullName: Joi.string().required(),
      region: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required(),
      amount: Joi.number().required(),
      sellerCode: Joi.string().required()
    }
  },

  // UPDATE /api/sellers/:sellerId
  updateseller: {
    body: {
      sellername: Joi.string().required(),
      fullName: Joi.string().required(),
      region: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required(),
      amount: Joi.number().required(),
      sellerCode: Joi.string().required()
    }

  },
  getseller: {
    body: {
      sellerCode: Joi.string().required()
    }

  },

  // POST /api/auth/login
  login: {
    body: {
      sellername: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
