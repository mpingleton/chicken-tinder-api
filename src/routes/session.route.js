const express = require('express');

const sessionController = require('../controllers/session.controller');
const tokenMiddleware = require('../middleware/token.middleware');

const router = express.Router();

router.get(
  '/',
  tokenMiddleware.verifyAccessToken,
  sessionController.getAllSessions,
);

router.get(
  '/me',
  tokenMiddleware.verifyAccessToken,
  sessionController.getCurrentActiveSessionForMe,
);

router.put(
  '/',
  tokenMiddleware.verifyAccessToken,
  sessionController.createSession,
);

module.exports = router;
