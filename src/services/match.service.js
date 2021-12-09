const { models } = require('../database');

const enterMatch = async (sessionId, restaurantId) => {
  await models.Match.create({
    session_id: sessionId,
    restaurant_id: restaurantId,
  });
};

module.exports = {
  enterMatch,
};
