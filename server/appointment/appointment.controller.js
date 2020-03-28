/* eslint-disable consistent-return */
const Appointmentsdb = require('./appointment.model');


/**
 * Load Seller and append to req.
 */
function load(req, _res, next, id) {
  Appointmentsdb.get(id)
    .then((Seller) => {
      req.Seller = Seller; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get Seller
 * @returns {Seller}
 */
function get(req, res) {
  return res.json(req.Seller);
}
/**
 * get spesific Sellers
 * @property {string} req.body.year - The Sellername of Seller.
 * @property {string} req.body.month - The mobileNumber of Seller.
 * @property {string} req.body.day - The Sellername of Seller.
 * @property {string} req.body.time - The Sellername of Seller.
 * @returns {Appointments}
 */
function getAppointments(req, res) {
  Appointmentsdb.find({ sellerCode: req.body.sellerCode},(_err,seller) =>{
    if (seller == null) {
      return res.json({
        error: 'Seller with this SellerCode does not exist'
      });
    }
      return res.json({
        Appointments:seller
      });
  })

}

/**
 * Create new Seller
 * @property {string} req.body.Sellername - The Sellername of Seller.
 * @property {string} req.body.fullname - The mobileNumber of Seller.
 * @property {string} req.body.email - The Sellername of Seller.
 * @property {string} req.body.password - The Sellername of Seller.
 * @property {string} req.body.region - The mobileNumber of Seller.
 * @property {string} req.body.amount - The Sellername of Seller.
 * @property {string} req.body.sallerCode - The mobileNumber of Seller.
 * @returns {Seller}
 */
function create(req, res, next) {
  Appointmentsdb.findOne({ year: req.body.year,month: req.body.month,day: req.body.day,time: req.body.time}, (_err, seller) => {
    if (seller !== null) {
      return res.json({
        errorSellerCode: 'this day you have already appointment'
      });
    }
    const newAppointment = new Appointmentsdb({
      year: req.body.year,
      month: req.body.month,
      day: req.body.day,
      time: req.body.time,
      sellerid:req.body.sellerid,
      school:req.body.school,
      NameResponse:req.body.NameResponse,
      PhoneResponse:req.body.PhoneResponse,
      email:req.body.email,
      topothesh:req.body.topothesh
    });

    newAppointment.save()
      .then(savedSeller => res.json(savedSeller))
      .catch(e => next(e));
  });
}

/**
 * Update existing Seller
 * @property {string} req.body.Sellername - The Sellername of Seller.
 * @property {string} req.body.fullname - The mobileNumber of Seller.
 * @property {string} req.body.email - The Sellername of Seller.
 * @property {string} req.body.password - The Sellername of Seller.
 * @property {string} req.body.region - The mobileNumber of Seller.
 * @property {string} req.body.amount - The Sellername of Seller.
 * @property {string} req.body.sallerCode - The mobileNumber of Seller.
 * @returns {Seller}
 */
function update(req, res, next) {

  Appointmentsdb.findOneAndUpdate({sellername:req.body.sellername},req.body,{upsert:false},function(err,seller){
        if(seller ===null){
            return res.send(500,{error: "Seller with this Sellername doesntExist"});
        }else{
          return res.json({
            succefully: "Succefully Seller updated."
          });
        }


  })
//  const Seller = req.Seller;
//  Seller.Sellername = req.body.Sellername;
//  Seller.mobileNumber = req.body.mobileNumber;

//  Seller.save()
//    .then(savedSeller => res.json(savedSeller))
//    .catch(e => next(e));
}

/**
 * Get Seller list.
 * @property {number} req.query.skip - Number of Sellers to be skipped.
 * @property {number} req.query.limit - Limit number of Sellers to be returned.
 * @returns {Seller[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Appointmentsdb.list({ limit, skip })
    .then(Sellers => res.json(Sellers))
    .catch(e => next(e));
}

/**
 * Delete Seller.
 * @returns {Seller}
 */
function remove(req, res, next) {
  Appointmentsdb.findOne({ sellername: req.body.sellername }, (_err, seller) => {
    if (seller == null) {
      return res.json({
        error: 'Seller with this Sellername doesnt exist'
      });
    }
    Appointmentsdb.remove()
          .then(deletedSeller => res.json(deletedSeller))
          .catch(e => next(e));
  });
  // const Seller = req.Seller;
  // Seller.remove()
  //  .then(deletedSeller => res.json(deletedSeller))
  //  .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove,getAppointments };
