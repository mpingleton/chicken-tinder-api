const likeService = require('../services/like.service');
const sessionService = require('../services/session.service');
const matchService = require('../services/match.service');

const enterLike = async (req, res) => {
  const sessions = await sessionService.getActiveSessionsForUser(req.user.userId);
  if (sessions.length === 0) {
    res.send(403);
    return;
  } else if (sessions.length > 1) {
    res.send(500);
    return;
  }

  // Get the already existing swipes for this restaurant.
  const likes = await likeService.getLikesBySessionAndRestaurant(sessions[0].id, req.body.restaurantId);
  if (likes.length === 0) {
    // If not, create a like.
    await likeService.enterLike(
      sessions[0].id,
      req.user.userId,
      req.body.restaurantId,
      req.body.swipeRight,
    );
  } else {
    await likeService.clearLikesBySessionAndRestaurant(sessions[0].id, req.body.restaurantId)
    await matchService.enterMatch(sessions[0].id, req.body.restaurantId);
  }

  res.send(200);
};

module.exports = {
  enterLike,
};
