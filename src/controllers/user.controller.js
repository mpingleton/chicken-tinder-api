const userService = require('../services/user.service');

const getMe = async (req, res) => {
  const user = await userService.getUserById(req.user.userId);

  const responseData = {
    id: user.id,
    username: user.username,
  };

  res.send(200, responseData);
};

module.exports = {
  getMe,
};
