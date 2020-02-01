/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const Product = require('./product.model');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage }).single('myimage');

function load(req, _res, next, id) {
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
  // eslint-disable-next-line consistent-return
  // eslint-disable-next-line consistent-return
  upload(req, res, (err) => {
    Product.findOne({ productCode: req.body.productCode }, (_err, product) => {
      console.log('req.body.productCode: ', req.body.productCode);
      console.log('product form findOne: ', product);
      if (err) {
        return res.end('error request file');
      }
      if (product !== null) {
        return res.json({
          errorproductCode: 'product with this productCode Excist'
        });
      }
      const filePath = req.file.path.replace(process.cwd(), '');
      const newProduct = new Product({
        productDetail: req.body.productDetail,
        productCode: req.body.productCode,
        productCategory: req.body.productCategory,
        productSubcategory: req.body.productSubcategory,
        productQuantity: req.body.productQuantity,
        productPosition: req.body.productPosition,
        productOrder: req.body.productOrder,
        filename: req.file.filename,
        originalname: filePath,
      });
      newProduct.save()
        .then(savedProduct => res.json(savedProduct))
        .catch(e => next(e));
    });
  });
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
function update(req, res, _next) {
  // πρωτη παραμετρος ειναι το query δευτερη τι θελω να αντικαταστησω το upsert αν ειναι φαλσε
  // σε περιπτωση που δεν υπαρχει το productCode δεν κανει create new product
  Product.findOneAndUpdate({ productCode: req.body.productCode },
    req.body, { upsert: false },
    (_err, product) => {
      if (product === null) {
        return res.send(500, { error: 'the product with this productCode doesntExist' });
      }
      if (req.body.wantToadd === 'add') { // τι πραξη θελω να κανω
             // req.body.productQuantity εχει την ποσοτητα που θελω να προσθεσω πχ αν το req.body.productQuantity
             // ειναι 100  και το req.body.productQuantity ειναι 50
             // στην βαση θα μπει 100+50 = 150
        const updatedProduct = Object.assign({}, product);
        updatedProduct.productQuantity = product.productQuantity + req.body.productQuantity;
           // κανουμε update to new productQuantity
        updatedProduct.save((err) => {
          if (err) {
            return res.json({
              error: err
            });
          }
        });
        return res.json({
          data:product
        });
      } else if (req.body.productQuantity > product.productQuantity) {
        return res.json({
          error: 'Δεν μπορεις να διαγραψεις τοσο μεγαλη ποσοτητα.'
        });
      } else {
        const updatedProduct = Object.assign({}, product);
        updatedProduct.productQuantity = product.productQuantity - req.body.productQuantity;
        updatedProduct.save((err) => {
          if (err) {
            return res.json({
              error: err
            });
          }
        });
        return res.json({
          data: product
        });
      }
      return res.json({
        succefully: 'Succefully saved.',
        Product: product
      });
    });
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
    .then(products => res.json({ data: products }))
    .catch(e => next(e));
}

/**
 * Delete Product.
 * @returns {Product}
 */
function remove(req, res, next) {
  Product.findOne({ productCode: req.body.productCode }, (_err, product) => {
    if (product == null) {
      return res.json({
        error: 'product with this productCode doesnt exist'
      });
    }
    product.remove()
.then(deletedProduct => res.json(deletedProduct))
.catch(e => next(e));
  });
}

module.exports = { load, get, create, update, list, remove };
