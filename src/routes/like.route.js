const express = require('express');

const likeController = require('../controllers/like.controller');
const tokenMiddleware = require('../middleware/token.middleware');

const router = express.Router();

router.put(
  '/',
  tokenMiddleware.verifyAccessToken,
  likeController.enterLike,
);

module.exports = router;
