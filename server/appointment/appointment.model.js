const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');




const apointmentSchema = new mongoose.Schema({
  year: {
      type: String,
      required: true
    },
    month: {
      type: String,
      required: true
    },
    day: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    sellerid: {
      type: String,
      required: true
    },
    school: {
      type: String,
      required: true
    },
    NameResponse: {
      type: String,
      required: true
    },
    PhoneResponse: {
      type:String,
      required:true
    //  match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
    },
    email: {
      type: String
    },
    topothesh: {
      type:String,
      required:true
    }
});
/**
 * seller Schema
 */


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
apointmentSchema.method({
});

/**
 * Statics
 */
apointmentSchema.statics = {
  /**
   * Get seller
   * @param {ObjectId} id - The objectId of seller.
   * @returns {Promise<seller, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((seller) => {
        if (seller) {
          return seller;
        }
        const err = new APIError('No such seller exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List sellers in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of sellers to be skipped.
   * @param {number} limit - Limit number of sellers to be returned.
   * @returns {Promise<seller[]>}
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
 * @typedef Seller
 */
module.exports = mongoose.model('appointments', apointmentSchema);
