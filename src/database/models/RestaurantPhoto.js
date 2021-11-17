const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const RestaurantPhoto = sequelize.define('RestaurantPhoto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'restaurants',
        key: 'id',
      },
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'restaurant_photos'
  });

  return RestaurantPhoto;
};
