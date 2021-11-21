const { Op } = require('sequelize');
const { models } = require('../database');

const getAllSessions = async () => {
  const sessions = await models.Session.findAll({});
  return sessions;
};

const getActiveSessionsForUser = async (userId) => {
  const sessions = await models.Session.findAll({
    where: {
      status: 1,
      [Op.or]: [
        { user_a_id: userId },
        { user_b_id: userId },
      ],
    },
  });
  return sessions;
};

module.exports = {
  getAllSessions,
  getActiveSessionsForUser,
};
