const restaurantService = require('../services/restaurant.service');

const getAllRestaurants = async (req, res) => {
  const restaurants = await restaurantService.getAllRestaurants();

  const promises = [];
  const responseData = restaurants.map((restaurant) => {
    const restaurantData = {
      id: restaurant.id,
      name: restaurant.name,
      location: restaurant.location,
    };
    promises.push(restaurantService.getRestaurantPhotos(restaurantData.id)
      .then((photos) => {
        restaurantData.photos = photos.map((photo) => ({ url: photo.photo_url }));
      }));

    return restaurantData;
  });
  await Promise.all(promises);

  res.send(200, responseData);
};

const getRestaurantsInLocation = async (req, res) => {
  const restaurants = await restaurantService.getRestaurantsInLocation(req.query.location);

  const promises = [];
  const responseData = restaurants.map((restaurant) => {
    const restaurantData = {
      id: restaurant.id,
      name: restaurant.name,
      location: restaurant.location,
    };
    promises.push(restaurantService.getRestaurantPhotos(restaurantData.id)
      .then((photos) => {
        restaurantData.photos = photos.map((photo) => ({ url: photo.photo_url }));
      }));

    return restaurantData;
  });
  await Promise.all(promises);

  res.send(200, responseData);
};

module.exports = {
  getAllRestaurants,
  getRestaurantsInLocation,
};
