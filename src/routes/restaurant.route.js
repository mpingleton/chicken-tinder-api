const express = require('express');

const restaurantController = require('../controllers/restaurant.controller');
const tokenMiddleware = require('../middleware/token.middleware');

const router = express.Router();

router.get(
  '/',
  tokenMiddleware.verifyAccessToken,
  restaurantController.getAllRestaurants,
);

module.exports = router;
