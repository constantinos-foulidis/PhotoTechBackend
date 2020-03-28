const Joi = require('joi');

/**
 * Create new Seller
 * @property {string} req.body.nomos - The nomos of School.
 * @property {string} req.body.schoolName - The name of school.
 * @property {string} req.body.dieuthinsh - The dieuthinsi of school.
 * @property {string} req.body.tmhmata - The tmhmata of school.
 * @property {string} req.body.sallerName - o pwlhths pou ekleise to school.
 * @property {string} req.body.packetCost - timh packetou.
 * @property {string} req.body.sallerCode -
 * @property {string} req.body.mobilePhone - The mobilePhone of school.
 * @property {string} req.body.schoolPhone - The schoolPhone of school.
 * @property {string} req.body.afm - The afm of school.
 * @property {string} req.body.doy - The doy of school.
 * @property {string} req.body.email - The email of school.
 * @property {string} req.body.fax - The fax of school.
 * @property {string} req.body.ekprosopos_sillogou - The ekprosopos_sillogou of school.
 * @property {string} req.body.dinami - The dinami of school.
 * @property {string} req.body.headTeacher - The headTeacher of school.
 * @returns {Customers}
 */
module.exports = {
  // POST /api/sellers
  createCustomer: {
    body: {
      nomos: Joi.string().required(),
      schoolName: Joi.string().required(),
      dieuthinsh: Joi.string().required(),
      tmhmata: Joi.string().required(),
      sellerName: Joi.string().required(),
      packetCost: Joi.string(),
      sellerCode: Joi.string().required(),
      mobilePhone: Joi.string().required(),
      schoolPhone: Joi.string().required(),
      afm: Joi.string().required(),
      doy: Joi.string().required(),
      email: Joi.string().required(),
      fax: Joi.string().required(),
      ekprosopos_sillogou: Joi.string().required(),
      dinami: Joi.string().required(),
      headTeacher: Joi.string().required()
    }
  },

  // UPDATE /api/sellers/:sellerId
  updateCustomer: {
    body: {
      nomos: Joi.string().required(),
      schoolName: Joi.string().required(),
      dieuthinsh: Joi.string().required(),
      tmhmata: Joi.string().required(),
      sellerName: Joi.string().required(),
      packetCost: Joi.number().required(),
      sellerCode: Joi.string().required(),
      mobilePhone: Joi.string().required(),
      schoolPhone: Joi.string().required(),
      afm: Joi.string().required(),
      doy: Joi.string().required(),
      email: Joi.string().required(),
      fax: Joi.string().required(),
      ekprosopos_sillogou: Joi.string().required(),
      dinami: Joi.string().required(),
      headTeacher: Joi.string().required()
    }

  },
  getCustomer: {
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
