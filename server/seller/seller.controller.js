/* eslint-disable consistent-return */
const Sellerdb = require("./seller.model");

/**
 * Load Seller and append to req.
 */
function load(req, _res, next, id) {
  Sellerdb.get(id)
    .then((Seller) => {
      req.Seller = Seller; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => next(e));
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
 * @property {string} req.body.Sellername - The Sellername of Seller.
 * @property {string} req.body.fullname - The mobileNumber of Seller.
 * @property {string} req.body.email - The Sellername of Seller.
 * @property {string} req.body.password - The Sellername of Seller.
 * @property {string} req.body.region - The mobileNumber of Seller.
 * @property {string} req.body.amount - The Sellername of Seller.
 * @property {string} req.body.sallerCode - The mobileNumber of Seller.
 * @returns {Seller}
 */
function getSellers(req, res) {
  Sellerdb.find({ sellerCode: req.body.sellerCode }, (_err, seller) => {
    if (seller == null) {
      return res.json({
        errorSellerCode: "Seller with this SellerCode does not exist",
      });
    }
    return res.json({
      Sellers: seller,
    });
  });
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
  Sellerdb.findOne({ sellername: req.body.sellername }, (_err, seller) => {
    if (seller !== null) {
      return res.json({
        errorSellername: "Seller with this Sellername already exist",
      });
    }
    const newseller = new Sellerdb({
      sellername: req.body.sellername,
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      region: req.body.region,
      amount: req.body.amount,
      sellerCode: req.body.sellerCode,
      apoitments: {
        year: req.body.apoitments[0],
        month: req.body.apoitments[1],
        day: req.body.apoitments[2],
        time: req.body.apoitments[3],
      },
    });

    newseller
      .save()
      .then((savedSeller) => res.json(savedSeller))
      .catch((e) => next(e));
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
  Sellerdb.findOneAndUpdate(
    { sellername: req.body.sellername },
    req.body,
    { upsert: false },
    function (err, seller) {
      if (seller === null) {
        return res.send(500, {
          error: "Seller with this Sellername doesntExist",
        });
      } else {
        return res.json({
          succefully: "Succefully Seller updated.",
        });
      }
    }
  );
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
  Sellerdb.list({ limit, skip })
    .then((Sellers) => res.json(Sellers))
    .catch((e) => next(e));
}

/**
 * Delete Seller.
 * @returns {Seller}
 */
function remove(req, res, next) {
  Sellerdb.findOne({ sellername: req.body.sellername }, (_err, seller) => {
    if (seller == null) {
      return res.json({
        error: "Seller with this Sellername doesnt exist",
      });
    }
    Sellerdb.remove()
      .then((deletedSeller) => res.json(deletedSeller))
      .catch((e) => next(e));
  });
  // const Seller = req.Seller;
  // Seller.remove()
  //  .then(deletedSeller => res.json(deletedSeller))
  //  .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove, getSellers };
