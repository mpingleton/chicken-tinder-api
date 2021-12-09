const { models } = require('../database');

const getSwipesBySessionAndRestaurant = async (
  sessionId,
  restaurantId,
) => {
  const swipes = await models.Swipe.findAll({
    where: {
      session_id: sessionId,
      restaurant_id: restaurantId,
    },
  });

  return swipes;
};

const clearSwipesBySessionAndRestaurant = async (
  sessionId,
  restaurantId,
) => {
  await models.Swipe.destroy({
    where: {
      session_id: sessionId,
      restaurant_id: restaurantId,
    },
  });
};

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
  getSwipesBySessionAndRestaurant,
  clearSwipesBySessionAndRestaurant,
  enterSwipe,
};
