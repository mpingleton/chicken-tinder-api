const express = require('express');

const swipeController = require('../controllers/swipe.controller');
const tokenMiddleware = require('../middleware/token.middleware');

const router = express.Router();

router.put(
  '/',
  tokenMiddleware.verifyAccessToken,
  swipeController.enterSwipe,
);

module.exports = router;
