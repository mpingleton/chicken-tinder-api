const swipeService = require('../services/swipe.service');
const sessionService = require('../services/session.service');
const matchService = require('../services/match.service');

const enterSwipe = async (req, res) => {
  const sessions = await sessionService.getActiveSessionsForUser(req.user.userId);
  if (sessions.length === 0) {
    res.send(403);
    return;
  } else if (sessions.length > 1) {
    res.send(500);
    return;
  }

  // Get the already existing swipes for this restaurant.
  const swipes = await swipeService.getSwipesBySessionAndRestaurant(sessions[0].id, req.body.restaurantId);
  if (swipes.length === 0) {
    // If not, create a swipe.
    await swipeService.enterSwipe(
      sessions[0].id,
      req.user.userId,
      req.body.restaurantId,
      req.body.swipeRight,
    );
  } else if (swipes[0].swipe_right) {
    await swipeService.clearSwipesBySessionAndRestaurant(sessions[0].id, req.body.restaurantId)
    await matchService.enterMatch(sessions[0].id, req.body.restaurantId);
  }

  res.send(200);
};

module.exports = {
  enterSwipe,
};
