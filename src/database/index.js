const { Sequelize, DataTypes } = require('sequelize');

const User = require('./models/User');
const Token = require('./models/Token');
const Restaurant = require('./models/Restaurant');
const RestaurantPhoto = require('./models/RestaurantPhoto');
const Session = require('./models/Session');
const Swipe = require('./models/Swipe');
const Match = require('./models/Match');

const sequelize = new Sequelize(process.env.DATABASE_URL);
const models = {};

const initDatabase = async () => {
  await sequelize.authenticate();

  models.User = User(sequelize);
  models.Token = Token(sequelize);
  models.Restaurant = Restaurant(sequelize);
  models.RestaurantPhoto = RestaurantPhoto(sequelize);
  models.Session = Session(sequelize);
  models.Swipe = Swipe(sequelize);
  models.Match = Match(sequelize);
};

const closeDatabase = async () => {
  await sequelize.close();
};

const syncModels = async () => {
  await sequelize.sync({ force: true });
};

module.exports = {
  sequelize,
  models,
  initDatabase,
  closeDatabase,
  syncModels,
};
