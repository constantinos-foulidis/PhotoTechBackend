const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/validateCustomers');
const customersCtrl = require('./customers.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/sellers - Get list of sellers */
  .get(customersCtrl.list)

  /** POST /api/sellers - Create new seller */
  .post(validate(paramValidation.createCustomer), customersCtrl.create);

router.route('/:sellerId')
  /** GET /api/sellers/:sellerId - Get seller */
  .get(customersCtrl.get);

  /** PUT /api/sellers/:sellerId - Update seller */
//  .put(validate(paramValidation.updateseller), sellerCtrl.update)

  /** DELETE /api/seller/:sellerId - Delete seller */
//  .delete(sellerCtrl.remove);

/** Load seller when API with sellerId route parameter is hit */
router.param('sellerId', customersCtrl.load);
router.route('/delete')
.delete(customersCtrl.remove);
router.route('/update')
.post(validate(paramValidation.updateCustomer), customersCtrl.update);
router.route('/under')
.post(validate(paramValidation.getCustomer), customersCtrl.getCustomers);

module.exports = router;
