const { models } = require('../database');

const getAllRestaurants = async () => {
  const restaurants = await models.Restaurant.findAll({});
  return restaurants;
};

module.exports = {
  getAllRestaurants,
};
