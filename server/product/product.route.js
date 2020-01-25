const express = require('express');
const validate = require('express-validation');
const paramValidation = require('./param-validationproduct');
const productCtrl = require('./product.controller');


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/products/products - Get list of products */
  .get(productCtrl.list)

  /** POST /api/products - Create new product */
  .post(validate(paramValidation.createProduct), productCtrl.create);


router.route('/:productId')
  /** GET /api/products/:productId - Get product */
  .get(productCtrl.get);

  /** PUT /api/products/:productId - Update product */


  /** DELETE /api/products/:productId - Delete product */
//  .delete(productCtrl.remove);
router.route('/delete')
.delete(productCtrl.remove);
router.route('/update')
.post(validate(paramValidation.updateProduct), productCtrl.update);
/** Load product when API with productId route parameter is hit */
// router.param('productId', productCtrl.load);

module.exports = router;
