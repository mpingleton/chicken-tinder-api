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

router.post(
  '/join/:joinCode',
  tokenMiddleware.verifyAccessToken,
  sessionController.joinSession,
);

module.exports = router;
