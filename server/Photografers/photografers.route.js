const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/validatePhotografers');
const photografersCtrl = require('./photografers.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/sellers - Get list of sellers */
  .get(photografersCtrl.list)

  /** POST /api/sellers - Create new seller */
  .post(validate(paramValidation.createphotografer), photografersCtrl.create);

router.route('/:sellerId')
  /** GET /api/sellers/:sellerId - Get seller */
  .get(photografersCtrl.get);

  /** PUT /api/sellers/:sellerId - Update seller */
//  .put(validate(paramValidation.updateseller), sellerCtrl.update)

  /** DELETE /api/seller/:sellerId - Delete seller */
//  .delete(sellerCtrl.remove);

/** Load seller when API with sellerId route parameter is hit */
router.param('sellerId', photografersCtrl.load);
router.route('/delete')
.delete(photografersCtrl.remove);
router.route('/update')
.post(validate(paramValidation.updatephotografer), photografersCtrl.update);
router.route('/under')
.post(validate(paramValidation.getphotografers), photografersCtrl.getPhotografer);

module.exports = router;
