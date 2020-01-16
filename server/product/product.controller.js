const Product = require('./product.model');

function load(req, res, next, id) {
  Product.get(id)
    .then((product) => {
      req.product = product; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get product
 * @returns {Product}
 */
function get(req, res) {
  return res.json(req.product);
}

/**
 * Create new Product
 * @property {string} req.body.productDetail - Περιγραφη προιοντος.
 * @property {string} req.body.productCode - κωδικός προιοντος.
 * @property {string} req.body.productCategory - Κατηγορία προιοντος.
 * @property {string} req.body.productSubcategory - Υποκατηγορια Προιοντος.
 * @property {string} req.body.productPosition - Θεση προιοντος.
 * @property {string} req.body.productOrder - ταξη προιοντος πχ Α δημοτηκου.
 * @returns {Product}
 */
function create(req, res, next) {
  const product = new Product({
    productDetail: req.body.productDetail,
    productCode: req.body.productCode,
    productCategory: req.body.productCategory,
    productSubcategory: req.body.productSubcategory,
    productPosition: req.body.productPosition,
    productOrder: req.body.productOrder,
  });

  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}

/**
 * Update existing Product
 * @property {string} req.body.productDetail - Περιγραφη προιοντος.
 * @property {string} req.body.productCode - κωδικός προιοντος.
 * @property {string} req.body.productCategory - Κατηγορία προιοντος.
 * @property {string} req.body.productSubcategory - Υποκατηγορια Προιοντος.
 * @property {string} req.body.productPosition - Θεση προιοντος.
 * @property {string} req.body.productOrder - ταξη προιοντος πχ Α δημοτηκου.
 * @returns {Product}
 */
function update(req, res, next) {
  const product = req.product;
  product.productDetail = req.body.productDetail;
  product.productCode = req.body.productCode;
  product.productCategory = req.body.productCategory;
  product.productSubcategory = req.body.productSubcategory;
  product.productPosition = req.body.productPosition;
  product.productOrder = req.body.productOrder;

  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}

/**
 * Get Product list.
 * @property {number} req.query.skip - Number of products to be skipped.
 * @property {number} req.query.limit - Limit number of products to be returned.
 * @returns {Product[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Product.list({ limit, skip })
    .then(products => res.json(products))
    .catch(e => next(e));
}

/**
 * Delete Product.
 * @returns {Product}
 */
function remove(req, res, next) {
  const product = req.product;
  product.remove()
    .then(deletedProduct => res.json(deletedProduct))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
