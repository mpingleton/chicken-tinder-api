const { models } = require('../database');

const createUser = async (username, passphrase, isLocked) => {
  await models.User.create({
    username: username,
    passphrase: passphrase,
    is_locked: isLocked,
  });
};

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
  createUser,
  getUserById,
  getUserByUsername,
};
