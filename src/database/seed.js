if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { models, initDatabase, closeDatabase } = require('./index.js');

const userData = [
  {
    username: 'john.doe',
    passphrase: '12345',
    is_locked: false,
  },
  {
    username: 'jane.doe',
    passphrase: '12345',
    is_locked: false,
  },
];

const restaurantData = [
  {
    name: 'TJs',
    location: 'Knob Noster',
  },
  {
    name: 'Miller and Sons',
    location: 'Knob Noster',
  },
  {
    name: 'King Chef',
    location: 'Warrensburg',
  },
  {
    name: 'Pings Hibatchi',
    location: 'Warrensburg',
  },
  {
    name: 'Blackadder Cafe',
    location: 'Warrensburg',
  },
];

const photoData = [
  {
    restaurant_id: 1,
    photo_url: 'http://localhost/content/tjs.png',
  },
  {
    restaurant_id: 2,
    photo_url: 'http://localhost/content/millersons.png',
  },
];

const main = async () => {
  // Connect to the database.
  await initDatabase();

  // User data.
  for (const user of userData) {
    await models.User.create(user);
  }

  // Restaurant data.
  for (const restaurant of restaurantData) {
    await models.Restaurant.create(restaurant);
  }

  // Restaurant photo data.
  for (const photo of photoData) {
    await models.RestaurantPhoto.create(photo);
  }

  // Close the database connection so the application can close.
  await closeDatabase();
};

main();
