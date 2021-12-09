const { models } = require('../database');

const enterSwipe = async (
  sessionId,
  userId,
  restaurantId,
  swipeRight,
) => {
  await models.Swipe.create({
    session_id: sessionId,
    user_id: userId,
    restaurant_id: restaurantId,
    swipe_right: swipeRight,
  });
};

module.exports = {
  enterSwipe,
};
