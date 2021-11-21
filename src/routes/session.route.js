const express = require('express');

const sessionController = require('../controllers/session.controller');
const tokenMiddleware = require('../middleware/token.middleware');

const router = express.Router();

router.get(
  '/',
  tokenMiddleware.verifyAccessToken,
  sessionController.getAllSessions,
);

module.exports = router;
