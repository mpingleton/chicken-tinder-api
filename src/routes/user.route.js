const express = require('express');

const userController = require('../controllers/user.controller');
const tokenMiddleware = require('../middleware/token.middleware');

const router = express.Router();

router.get(
  '/me',
  tokenMiddleware.verifyAccessToken,
  userController.getMe,
);

module.exports = router;
