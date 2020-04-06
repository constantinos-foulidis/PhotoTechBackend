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
  createphotografer: {
    body: {
      photografername: Joi.string().required(),
      fullName: Joi.string().required(),
      region: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required(),
      amount: Joi.number().required(),
      photograferid: Joi.string().required(),
      apoitments: Joi.array().required()
    }
  },

  // UPDATE /api/sellers/:sellerId
  updatephotografer: {
    body: {
      photografername: Joi.string().required(),
      fullName: Joi.string().required(),
      region: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required(),
      amount: Joi.number().required(),
      photograferid: Joi.string().required()
    }

  },
  getphotografers: {
    body: {
      photograferCode: Joi.string().required()
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
