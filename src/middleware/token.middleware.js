const tokenService = require('../services/token.service');

const verifyAccessToken = async (req, res, nxt) => {
  // Get the token out of the header.
  const authorization = req.headers['authorization'];
  if (authorization == null) {
    res.send(401);
    return;
  }
  const accessToken = authorization.split(' ')[1];

  // Verify the token.
  const user = await tokenService.verifyToken(accessToken);
  if(user === null) {
    res.send(401);
    return;
  } else {
    req.user = user;
    nxt();
    return;
  }

  res.send(401);
};

module.exports = {
  verifyAccessToken,
};
