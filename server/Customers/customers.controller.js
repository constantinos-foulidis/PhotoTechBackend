/* eslint-disable consistent-return */
const Customersdb = require('./customers.model');


/**
 * Load Seller and append to req.
 */
function load(req, _res, next, id) {
  Customersdb.get(id)
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
function getCustomers(req, res) {
  Customersdb.find({ sellerCode: req.body.sellerCode},(_err,seller) =>{
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
 * @property {string} req.body.nomos - The nomos of School.
 * @property {string} req.body.schoolName - The name of school.
 * @property {string} req.body.dieuthinsh - The dieuthinsi of school.
 * @property {string} req.body.tmhmata - The tmhmata of school.
 * @property {string} req.body.sallerName - o pwlhths pou ekleise to school.
 * @property {string} req.body.packetCost - timh packetou.
 * @property {string} req.body.sallerCode -
 * @property {string} req.body.mobilePhone - The mobilePhone of school.
 * @property {string} req.body.schoolPhone - The schoolPhone of school.
 * @property {string} req.body.afm - The afm of school.
 * @property {string} req.body.doy - The doy of school.
 * @property {string} req.body.email - The email of school.
 * @property {string} req.body.fax - The fax of school.
 * @property {string} req.body.ekprosopos_sillogou - The ekprosopos_sillogou of school.
 * @property {string} req.body.dinami - The dinami of school.
 * @property {string} req.body.headTeacher - The headTeacher of school.
 * @returns {Customers}
 */
function create(req, res, next) {
  Customersdb.findOne({ schoolName: req.body.schoolName}, (_err, seller) => {
    if (seller !== null) {
      return res.json({
        errorCustomer: 'this customer already exist'
      });
    }
    const newCustomer = new Customersdb({
      nomos: req.body.nomos,
      schoolName: req.body.schoolName ,
      dieuthinsh: req.body.dieuthinsh,
      tmhmata: req.body.tmhmata,
      sellerName: req.body.sellerName,
      packetCost: req.body.packetCost,
      sellerCode: req.body.sellerCode,
      mobilePhone:   req.body.mobilePhone,
      schoolPhone:req.body.schoolPhone,
      photograferid:req.body.photograferid,
      afm: req.body.afm,
      doy: req.body.doy,
      email: req.body.email,
      fax: req.body.fax,
      ekprosopos_sillogou: req.body.ekprosopos_sillogou,
      dinami: req.body.dinami,
      headTeacher: req.body.headTeacher
    });

    newCustomer.save()
      .then(savedCustomer => res.json(savedCustomer))
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

  Customersdb.findOneAndUpdate({sellername:req.body.sellername},req.body,{upsert:false},function(err,seller){
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
  Customersdb.list({ limit, skip })
    .then(Sellers => res.json(Sellers))
    .catch(e => next(e));
}

/**
 * Delete Seller.
 * @returns {Seller}
 */
function remove(req, res, next) {
  Customersdb.findOne({ sellername: req.body.sellername }, (_err, seller) => {
    if (seller == null) {
      return res.json({
        error: 'Seller with this Sellername doesnt exist'
      });
    }
    Customersdb.remove()
          .then(deletedSeller => res.json(deletedSeller))
          .catch(e => next(e));
  });
  // const Seller = req.Seller;
  // Seller.remove()
  //  .then(deletedSeller => res.json(deletedSeller))
  //  .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove,getCustomers };
