const { models } = require('../database');

const getAllSessions = async () => {
  const sessions = await models.Session.findAll({});
  return sessions;
};

module.exports = {
  getAllSessions,
};
