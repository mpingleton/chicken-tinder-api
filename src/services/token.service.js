if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const jwt = require('jsonwebtoken');
const { models } = require('../database');

const createAccessTokenForUser = async (user) => {
  // Create a token.
  const newToken = jwt.sign({ username: user.username }, process.env.JWT_ACCESS_SECRET_KEY);

  // Add it to the database.
  await models.Token.create({
    token: newToken,
    user_id: user.id,
    invalidated: false,
  });

  return newToken;
};

const invalidateToken = async (token) => {
  await models.Token.update({
    invalidated: true,
  }, {
    where: {
      token: token,
    },
  });
};

const verifyToken = async (token) => {
  // JWT verify the token.
  var decodedObject = undefined;
  jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY, (err, decoded) => {
    if (err) {
      decodedObject = null;
    } else {
      decodedObject = decoded;
    }
  });
  if(decodedObject === null) {
    return null;
  }

  // Look up the token in the database; make sure it wasn't invalidated.
  const databaseToken = await models.Token.findOne({
    where: {
      token: token,
    },
  });
  if(databaseToken === null) {
    return null;
  } else if(databaseToken.invalidated === true) {
    return null;
  }

  // Look up the decoded username and make sure it's a match with the token's user_id.
  const databaseUser = await models.User.findOne({
    where: {
      username: decodedObject.username,
    },
  });
  if(databaseUser === null) {
    return null;
  } else if(databaseUser.id === databaseToken.user_id) {
    return {
      userId: databaseUser.id,
      username: databaseUser.username,
    };
  }

  return null;
};

module.exports = {
  createAccessTokenForUser,
  invalidateToken,
  verifyToken,
};
