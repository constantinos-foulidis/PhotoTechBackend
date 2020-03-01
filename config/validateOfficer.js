const Joi = require('joi');

module.exports = {
  // POST /api/users
  createOfficer: {
    body: {
      username: Joi.string().required(),
      fullName: Joi.string().required(),
      sellerCode: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateOfficer: {
    body: {
      username: Joi.string().required(),
      fullName: Joi.string().required(),
      sellerCode: Joi.string().required(),
      password: Joi.string().required()
    }

  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
