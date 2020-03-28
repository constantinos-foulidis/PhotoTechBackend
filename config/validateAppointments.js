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
  createAppointment: {
    body: {
      year: Joi.string().required(),
      month: Joi.string().required(),
      day: Joi.string().required(),
      time: Joi.string().required(),
      sellerid: Joi.string().required(),
      school: Joi.string().required(),
      NameResponse: Joi.string().required(),
      PhoneResponse: Joi.string().required(),
      email: Joi.string().required(),
      topothesh: Joi.string().required()

    }
  },

  // UPDATE /api/sellers/:sellerId
  updateAppoitment: {
    body: {
      year: Joi.string().required(),
      month: Joi.string().required(),
      day: Joi.string().required(),
      time: Joi.string().required(),
      sellerid: Joi.string().required(),
      school: Joi.string().required(),
      NameResponse: Joi.string().required(),
      PhoneResponse: Joi.string().required(),
      email: Joi.string().required(),
      topothesh: Joi.string().required()
    }

  },
  getAppointment: {
    body: {
      sellerCode: Joi.string().required()
    }

  },

};
