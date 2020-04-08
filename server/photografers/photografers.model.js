const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');


const customersSchema = new mongoose.Schema({
  topothesy: {
    type: String
  },
  school: {
    type: String
  //  match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  photograferName:{
    type: String
  },
  dynami: {
    type: String
  },
  PacketCost:{
    type:String
  }
});
const apointmentSchema = new mongoose.Schema({
  year: {
    type: String
  },
  month: {
    type: String
  //  match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  day:{
    type: String
  },
  time: {
    type: String
  }
});
/**
 * seller Schema
 */
const photograferSchema = new mongoose.Schema({
  photografername: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  //  match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  email:{
    type: String,
    required:true
  },
  password: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  //  match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  apoitments:[apointmentSchema],
  amount: {
    type: Number,
    required: true,
},
photograferCode: {
  type: String,
  required: true,
},
customers: [customersSchema],
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
photograferSchema.method({
});

/**
 * Statics
 */
photograferSchema.statics = {
  /**
   * Get seller
   * @param {ObjectId} id - The objectId of seller.
   * @returns {Promise<seller, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((photografer) => {
        if (photografer) {
          return photografer;
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
module.exports = mongoose.model('photografer', photograferSchema);
