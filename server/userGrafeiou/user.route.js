const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/validateOfficer');
const officerCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/sellers - Get list of sellers */
  .get(officerCtrl.list)

  /** POST /api/sellers - Create new seller */
  .post(validate(paramValidation.createOfficer), officerCtrl.create);


router.route('/delete')
.delete(officerCtrl.remove);
router.route('/update')
.post(validate(paramValidation.updateOfficer), officerCtrl.update);


module.exports = router;
