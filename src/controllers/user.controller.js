const userService = require('../services/user.service');

const register = async (req, res) => {
  const existingUser = await userService.getUserByUsername(req.body.username);
  if (existingUser != null) {
    res.send(400);
    return;
  }

  await userService.createUser(req.body.username, req.body.passphrase, false);
  res.send(201);
};

const getMe = async (req, res) => {
  const user = await userService.getUserById(req.user.userId);

  const responseData = {
    id: user.id,
    username: user.username,
  };

  res.send(200, responseData);
};

module.exports = {
  register,
  getMe,
};
