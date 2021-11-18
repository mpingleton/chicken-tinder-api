const express = require('express');

const userController = require('../controllers/user.controller');
const tokenMiddleware = require('../middleware/token.middleware');

const router = express.Router();

router.post(
  '/register',
  userController.register,
);

router.get(
  '/me',
  tokenMiddleware.verifyAccessToken,
  userController.getMe,
);

module.exports = router;
