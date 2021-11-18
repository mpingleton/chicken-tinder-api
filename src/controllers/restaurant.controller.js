const restaurantService = require('../services/restaurant.service');

const getAllRestaurants = async (req, res) => {
  const restaurants = await restaurantService.getAllRestaurants();

  const responseData = [];
  restaurants.map((restaurant) => {
    responseData.push({
      id: restaurant.id,
      name: restaurant.name,
      location: restaurant.location,
    });
  });

  res.send(200, responseData);
};

module.exports = {
  getAllRestaurants,
};
