const express = require('express');

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const restaurantRoute = require('./restaurant.route');
const sessionRoute = require('./session.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/restaurant', restaurantRoute);
router.use('/session', sessionRoute);

module.exports = router;
