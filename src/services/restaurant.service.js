const { models } = require('../database');

const getAllRestaurants = async () => {
  const restaurants = await models.Restaurant.findAll({});
  return restaurants;
};

const getRestaurantsInLocation = async (location) => {
  const restaurants = await models.Restaurant.findAll({
    where: {
      location: location,
    },
  });
  return restaurants;
};

module.exports = {
  getAllRestaurants,
  getRestaurantsInLocation,
};
