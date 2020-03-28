const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/validateAppointments');
const appointmentCtrl = require('./appointment.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/sellers - Get list of sellers */
  .get(appointmentCtrl.list)

  /** POST /api/sellers - Create new seller */
  .post(validate(paramValidation.createAppointment), appointmentCtrl.create);

router.route('/:sellerId')
  /** GET /api/sellers/:sellerId - Get seller */
  .get(appointmentCtrl.get);

  /** PUT /api/sellers/:sellerId - Update seller */
//  .put(validate(paramValidation.updateseller), sellerCtrl.update)

  /** DELETE /api/seller/:sellerId - Delete seller */
//  .delete(sellerCtrl.remove);

/** Load seller when API with sellerId route parameter is hit */
router.param('sellerId', appointmentCtrl.load);
router.route('/delete')
.delete(appointmentCtrl.remove);
router.route('/update')
.post(validate(paramValidation.updateAppoitment), appointmentCtrl.update);
router.route('/under')
.post(validate(paramValidation.getAppointment), appointmentCtrl.getAppointments);

module.exports = router;
