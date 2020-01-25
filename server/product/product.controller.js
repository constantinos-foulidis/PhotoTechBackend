const Product = require('./product.model');
var multer = require('multer');


const storage = multer.diskStorage({
	destination: '/uploads',
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

var upload = multer({storage: storage}).single('myimage');

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
function create(req, res, next){
	Product.findOne({productCode:req.body.productCode},function (err,product){
		if(product !== null){
			return res.json({
				errorproductCode : "product with this productCode Excist"
			});
		}else{
			upload(req,res,(err) => {
				 if(err){
					 return res.end('error request file');
				 }
				 const product = new Product({
					 productDetail: req.body.productDetail,
					 productCode: req.body.productCode,
					 productCategory: req.body.productCategory,
					 productSubcategory: req.body.productSubcategory,
					 productQuantity: req.body.productQuantity,
					 productPosition: req.body.productPosition,
					 productOrder: req.body.productOrder,
					 filename:req.file.filename,
					 originalname:req.file.originalname,
				 });
				 product.save()
					 .then(savedProduct => res.json(savedProduct))
					 .catch(e => next(e));
			});
		}

	})

};

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
  //πρωτη παραμετρος ειναι το query δευτερη τι θελω να αντικαταστησω το upsert αν ειναι φαλσε
  //σε περιπτωση που δεν υπαρχει το productCode δεν κανει create new product
  Product.findOneAndUpdate({productCode:req.body.productCode},req.body,{upsert:false},function(err,product){
     if(product === null){
      return res.send(500,{error: "the product with this productCode doesntExist"});
     }else{
           if(req.body.wantToadd === "add"){ //τι πραξη θελω να κανω
             //req.body.productQuantity εχει την ποσοτητα που θελω να προσθεσω πχ αν το req.body.productQuantity
             //ειναι 100  και το req.body.productQuantity ειναι 50
             //στην βαση θα μπει 100+50 = 150
           product.productQuantity = product.productQuantity+req.body.productQuantity;
           //κανουμε update to new productQuantity
           product.save(function(err){
                   if(err){
                     return res.json({
                       error : err
                     });
                   }
           });
           }else{
              if(req.body.productQuantity > product.productQuantity){
                  return res.json({
                    error : "Δεν μπορεις να διαγραψεις τοσο μεγαλη ποσοτητα."
                  });
              }else{
                product.productQuantity = product.productQuantity-req.body.productQuantity;
                product.save(function(err){
                        if(err){
                          return res.json({
                            error : err
                          });
                        }
                });
                return res.json({
                  error : product.productQuantity
                });

               };
           }
       return res.json({
         succefully: "Succefully saved.",
				 Product : product
       });
     }
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
    .then(products => res.json({data:products}))
    .catch(e => next(e));
}

/**
 * Delete Product.
 * @returns {Product}
 */
function remove(req, res, next) {
  Product.findOne({productCode:req.body.productCode},function(err,product){
		if(product == null){
			return res.json({
				error : "product with this productCode doesnt exist"
			});
		}else{
			product.remove()
		    .then(deletedProduct => res.json(deletedProduct))
		    .catch(e => next(e));
		}
	});
};

module.exports = { load, get, create, update, list, remove };
