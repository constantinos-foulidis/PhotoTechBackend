const Joi = require('joi');

module.exports = {
  // POST /api/users
  createProduct: {
    Title: Joi.string().required(),
    Year: Joi.string().required(),
    Released: Joi.string().required(),
    Actors: Joi.string().required(),
    Poster: Joi.string().required(),
    imdbRating: Joi.string().required(),
  },

  // UPDATE /api/users/:userId
  updateProduct: {
    body: {
      Title: Joi.string().required(),
      Year: Joi.string().required(),
      Released: Joi.string().required(),
      Actors: Joi.string().required(),
      Poster: Joi.string().required(),
      imdbRating: Joi.string().required(),
    }

  },

};
