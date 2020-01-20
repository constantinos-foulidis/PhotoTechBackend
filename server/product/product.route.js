const express = require('express');
const validate = require('express-validation');
const paramValidation = require('./param-validationproduct');
const productCtrl = require('./product.controller');


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users/products - Get list of users */
  .get(productCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createProduct),productCtrl.create);



router.route('/:productId')
  /** GET /api/users/:userId - Get user */
  .get(productCtrl.get)

  /** PUT /api/users/:userId - Update user */


  /** DELETE /api/users/:userId - Delete user */
  .delete(productCtrl.remove);

router.route('/update')
.post(validate(paramValidation.updateProduct), productCtrl.update);
/** Load user when API with userId route parameter is hit */
//router.param('productId', productCtrl.load);

module.exports = router;
