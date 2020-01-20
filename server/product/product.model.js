const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const ProductSchema = new mongoose.Schema({
  filename: {
     type: String,
     required: false
   },
   originalname: {
     type: Buffer,
     required: false
   },
  productDetail: {
    type: String,
    required: true
  },
  productCode: {
    type: String,
    required: true
  //  match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  productCategory: {
    type: String,
    required: true
  },
  productSubcategory: {
    type: String,
    required:true
  },
  productQuantity:{
    type:Number,
    required:true
  },
  productPosition: {
    type: String,
    required:true
  },
  productOrder: {
    type: String,
    required:true
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
ProductSchema.method({
});

/**
 * Statics
 */
ProductSchema.statics = {
  /**
   * Get product
   * @param {ObjectId} id - The objectId of product.
   * @returns {Promise<Product, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((product) => {
        if (product) {
          return product;
        }
        const err = new APIError('No such Product exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List products in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Products to be skipped.
   * @param {number} limit - Limit number of products to be returned.
   * @returns {Promise<Product[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Product
 */
module.exports = mongoose.model('Product', ProductSchema);
