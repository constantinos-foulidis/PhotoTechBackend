const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * officer Schema
 */
const OfficerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  //  match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  password: {
    type: String,
    required: true
  },
  sellerCode: {
    type: String,
    required: true
  //  match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
OfficerSchema.method({
});

/**
 * Statics
 */
OfficerSchema.statics = {
  /**
   * Get officer
   * @param {ObjectId} id - The objectId of officer.
   * @returns {Promise<officer, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((officer) => {
        if (officer) {
          return officer;
        }
        const err = new APIError('No such officer exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List officers in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of officers to be skipped.
   * @param {number} limit - Limit number of officers to be returned.
   * @returns {Promise<officer[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef officer
 */
module.exports = mongoose.model('officer', OfficerSchema);
