const { models } = require('../database');

const getLikesBySessionAndRestaurant = async (
  sessionId,
  restaurantId,
) => {
  const swipes = await models.Like.findAll({
    where: {
      session_id: sessionId,
      restaurant_id: restaurantId,
    },
  });

  return swipes;
};

const clearLikesBySessionAndRestaurant = async (
  sessionId,
  restaurantId,
) => {
  await models.Like.destroy({
    where: {
      session_id: sessionId,
      restaurant_id: restaurantId,
    },
  });
};

const enterLike = async (
  sessionId,
  userId,
  restaurantId,
) => {
  await models.Like.create({
    session_id: sessionId,
    user_id: userId,
    restaurant_id: restaurantId,
  });
};

module.exports = {
  getLikesBySessionAndRestaurant,
  clearLikesBySessionAndRestaurant,
  enterLike,
};
