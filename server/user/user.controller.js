/* eslint-disable consistent-return */
const User = require('./user.model');

/**
 * Load user and append to req.
 */
function load(req, _res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  User.findOne({ username: req.body.username }, (_err, user) => {
    if (user !== null) {
      return res.json({
        errorUsername: 'user with this username already exist'
      });
    }
    const newUser = new User({
      username: req.body.username,
      fullName: req.body.fullName,
      isAdmin: req.body.isAdmin,
      password: req.body.password,
    });

    newUser.save()
      .then(savedUser => res.json(savedUser))
      .catch(e => next(e));
  });
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
// eslint-disable-next-line no-unused-vars
function update(req, res, _next) {
  User.findOneAndUpdate({ username: req.body.username },
    req.body, { upsert: false }, (_err, user) => {
      if (user === null) {
        return res.send(500, { error: 'user with this username doesntExist' });
      }
      return res.json({
        succefully: 'Succefully user updated.'
      });
    });
//  const user = req.user;
//  user.username = req.body.username;
//  user.mobileNumber = req.body.mobileNumber;

//  user.save()
//    .then(savedUser => res.json(savedUser))
//    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  User.findOne({ username: req.body.username }, (_err, user) => {
    if (user == null) {
      return res.json({
        error: 'user with this username doesnt exist'
      });
    }
    user.remove()
          .then(deletedUser => res.json(deletedUser))
          .catch(e => next(e));
  });
  // const user = req.user;
  // user.remove()
  //  .then(deletedUser => res.json(deletedUser))
  //  .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
