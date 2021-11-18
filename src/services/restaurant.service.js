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

const getRestaurantPhotos = async (restaurantId) => {
  const restaurantPhotos = await models.RestaurantPhoto.findAll({
    where: {
      restaurant_id: restaurantId,
    },
  });
  return restaurantPhotos;
};

module.exports = {
  getAllRestaurants,
  getRestaurantsInLocation,
  getRestaurantPhotos,
};
