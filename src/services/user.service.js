const { models } = require('../database');

const getUserById = async (userId) => {
  const user = await models.User.findOne({
    where: {
      id: userId,
    },
  });
  return user;
};

const getUserByUsername = async (username) => {
  const user = await models.User.findOne({
    where: {
      username: username,
    },
  });

  return user;
};

module.exports = {
  getUserById,
  getUserByUsername,
};
