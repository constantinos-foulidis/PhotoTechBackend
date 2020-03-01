const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const authGrafeio = require('./server/authGrafeio/authGrafeio.route');
const productRoutes = require('./server/product/product.route');
const sellersRoutes = require('./server/seller/seller.route');
const officerRoutes = require('./server/userGrafeiou/user.route');
const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);
router.use('/product', productRoutes);
router.use('/sellers',sellersRoutes);
router.use('/officers',officerRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);
router.use('/auth/Grafeio',authGrafeio);
module.exports = router;
