const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');




const customersSchema = new mongoose.Schema({
  nomos: {
      type: String,
      required: true
    },
    schoolName: {
      type: String,
      required: true
      //  match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
    },
    dieuthinsh: {
      type: String,
      required: true
      //  match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
    },
    tmhmata: {
      type: String,
      required: true
      //  match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
    },
    sellerName: {
      type: String,
      required: true
    },
    photograferid: {
      type: String,
      required: true
    },
    packetCost: {
      type: String
    },
    sellerCode: {
      type: String,
      required: true
    },
    mobilePhone: {
      type: String,
      required: true
    },
    schoolPhone: {
      type: String,
      required: true
    },
    afm: {
      type: String,
      required: true
    },
    doy: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    fax: {
      type: String,
      required: true
    },
    ekprosopos_sillogou: {
      type: String,
      required: true
    },
    dinami: {
      type: String,
      required: true
    },
    headTeacher: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
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
customersSchema.method({
});

/**
 * Statics
 */
customersSchema.statics = {
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
module.exports = mongoose.model('customers', customersSchema);
