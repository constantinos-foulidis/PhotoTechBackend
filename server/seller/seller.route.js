const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/validateSeller');
const sellerCtrl = require('./seller.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/sellers - Get list of sellers */
  .get(sellerCtrl.list)

  /** POST /api/sellers - Create new seller */
  .post(validate(paramValidation.createseller), sellerCtrl.create);

router.route('/:sellerId')
  /** GET /api/sellers/:sellerId - Get seller */
  .get(sellerCtrl.get);

  /** PUT /api/sellers/:sellerId - Update seller */
//  .put(validate(paramValidation.updateseller), sellerCtrl.update)

  /** DELETE /api/seller/:sellerId - Delete seller */
//  .delete(sellerCtrl.remove);

/** Load seller when API with sellerId route parameter is hit */
router.param('sellerId', sellerCtrl.load);
router.route('/delete')
.delete(sellerCtrl.remove);
router.route('/update')
.post(validate(paramValidation.updateseller), sellerCtrl.update);
router.route('/under')
.post(validate(paramValidation.getseller), sellerCtrl.getSellers);

module.exports = router;
