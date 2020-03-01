/* eslint-disable consistent-return */
const Officer = require('./user.model');

/**
 * Load officer and append to req.
 */
function load(req, _res, next, id) {
  Officer.get(id)
    .then((officer) => {
      req.officer = officer; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get officer
 * @returns {officer}
 */
function get(req, res) {
  return res.json(req.officer);
}

/**
 * Create new officer
 * @property {string} req.body.officername - The officername of officer.
 * @property {string} req.body.mobileNumber - The mobileNumber of officer.
 * @returns {officer}
 */
function create(req, res, next) {
  Officer.findOne({ username: req.body.username }, (_err, officer) => {
    if (officer !== null) {
      return res.json({
        errorofficername: 'officer with this officername already exist'
      });
    }
    const newofficer = new Officer({
      username: req.body.username,
      fullName: req.body.fullName,
      sellerCode: req.body.sellerCode,
      password: req.body.password,
    });

    newofficer.save()
      .then(savedofficer => res.json(savedofficer))
      .catch(e => next(e));
  });
}

/**
 * Update existing officer
 * @property {string} req.body.officername - The officername of officer.
 * @property {string} req.body.mobileNumber - The mobileNumber of officer.
 * @returns {officer}
 */
function update(req, res, next) {

  Officer.findOneAndUpdate({officername:req.body.officername},req.body,{upsert:false},function(err,officer){
        if(officer ===null){
            return res.send(500,{error: "officer with this officername doesntExist"});
        }else{
          return res.json({
            succefully: "Succefully officer updated."
          });
        }


  })
//  const officer = req.officer;
//  officer.officername = req.body.officername;
//  officer.mobileNumber = req.body.mobileNumber;

//  officer.save()
//    .then(savedofficer => res.json(savedofficer))
//    .catch(e => next(e));
}

/**
 * Get officer list.
 * @property {number} req.query.skip - Number of officers to be skipped.
 * @property {number} req.query.limit - Limit number of officers to be returned.
 * @returns {officer[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Officer.list({ limit, skip })
    .then(officers => res.json(officers))
    .catch(e => next(e));
}

/**
 * Delete officer.
 * @returns {officer}
 */
function remove(req, res, next) {
  Officer.findOne({ officername: req.body.officername }, (_err, officer) => {
    if (officer == null) {
      return res.json({
        error: 'officer with this officername doesnt exist'
      });
    }
    officer.remove()
          .then(deletedofficer => res.json(deletedofficer))
          .catch(e => next(e));
  });
  // const officer = req.officer;
  // officer.remove()
  //  .then(deletedofficer => res.json(deletedofficer))
  //  .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
