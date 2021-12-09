const swipeService = require('../services/swipe.service');
const sessionService = require('../services/session.service');

const enterSwipe = async (req, res) => {
  const sessions = await sessionService.getActiveSessionsForUser(req.user.userId);
  if (sessions.length === 0) {
    res.send(403);
    return;
  } else if (sessions.length > 1) {
    res.send(500);
    return;
  }

  await swipeService.enterSwipe(
    sessions[0].id,
    req.user.userId,
    req.body.restaurantId,
    req.body.swipeRight,
  );
  res.send(200);
};

module.exports = {
  enterSwipe,
};
