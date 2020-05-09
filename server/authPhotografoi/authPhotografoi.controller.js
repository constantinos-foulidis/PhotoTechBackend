const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const User = require('../photografers/photografers.model');

// sample user, used for authentication


/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
// eslint-disable-next-line no-unused-vars
function login(req, res, _next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with
  //lol
  User.findOne({ photografername: req.body.photografername }, (_err, user) => {
    if (user !== null &&
      req.body.photografername === user.photografername
      && req.body.password === user.password) {
      const token = jwt.sign({
        photografername: user.photografername
      }, config.jwtSecret);
      return res.json({
        token,
        user: user,
        sellerCode: user.sellerCode

      });
    }

    return res.json({

      error: 'User authentication failed'
    });
  });

  // const err = new APIError('Authentication error');
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

module.exports = { login, getRandomNumber };
