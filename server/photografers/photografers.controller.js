/* eslint-disable consistent-return */
const Photograferdb = require('./photografers.model');


/**
 * Load Seller and append to req.
 */
function load(req, _res, next, id) {
  Photograferdb.get(id)
    .then((Photografer) => {
      req.Photografer = Photografer; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get Photografer
 * @returns {Photografer}
 */
function get(req, res) {
  return res.json(req.Photografer);
}
/**
 * get spesific Sellers
 * @property {string} req.body.Sellername - The Sellername of Seller.
 * @property {string} req.body.fullname - The mobileNumber of Seller.
 * @property {string} req.body.email - The Sellername of Seller.
 * @property {string} req.body.password - The Sellername of Seller.
 * @property {string} req.body.region - The mobileNumber of Seller.
 * @property {string} req.body.amount - The Sellername of Seller.
 * @property {string} req.body.sallerCode - The mobileNumber of Seller.
 * @returns {Seller}
 */
function getPhotografer(req, res) {
  Photograferdb.find({ photograferCode: req.body.photograferCode},(_err,photografer) =>{
    if (photografer == null) {
      return res.json({
        errorSellerCode: 'photografer with this SellerCode does not exist'
      });
    }
      return res.json({
        Photografer:photografer
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
  Photograferdb.findOne({ photografername: req.body.photografername }, (_err, seller) => {
    if (seller !== null) {
      return res.json({
        errorphotografername: 'photografer with this Sellername already exist'
      });
    }
    const newseller = new Photograferdb({
      photografername: req.body.photografername,
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      region:req.body.region,
      amount:req.body.amount,
      photograferCode:req.body.photograferCode,
      apoitments:{
          year:req.body.apoitments[0],
          month:req.body.apoitments[1],
          day:req.body.apoitments[2],
          time:req.body.apoitments[3]
      }
    });

    newseller.save()
      .then(savedPhotografer => res.json(savedPhotografer))
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

  Photograferdb.findOneAndUpdate({sellername:req.body.sellername},req.body,{upsert:false},function(err,photografer){
        if(photografer ===null){
            return res.send(500,{error: "photografer with this Sellername doesntExist"});
        }else{
          return res.json({
            succefully: "Succefully photografer updated."
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
  Photograferdb.list({ limit, skip })
    .then(Photografers => res.json(Photografers))
    .catch(e => next(e));
}

/**
 * Delete Seller.
 * @returns {Seller}
 */
function remove(req, res, next) {
  Photograferdb.findOne({ sellername: req.body.sellername }, (_err, seller) => {
    if (photografer == null) {
      return res.json({
        error: 'photografer with this Sellername doesnt exist'
      });
    }
    Photograferdb.remove()
          .then(deletedphotografer => res.json(deletedphotografer))
          .catch(e => next(e));
  });
  // const Seller = req.Seller;
  // Seller.remove()
  //  .then(deletedSeller => res.json(deletedSeller))
  //  .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove,getPhotografer };
