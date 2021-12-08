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

const getSessionByJoinCode = async (joinCode) => {
  const session = await models.Session.findOne({
    where: {
      join_code: joinCode,
    },
  });
  return session;
};

const createSession = async (
  status,
  userIdA,
  userIdB,
  joinCode,
) => {
  await models.Session.create({
    status: status,
    user_a_id: userIdA,
    user_b_id: userIdB,
    join_code: joinCode,
  });
};

const joinSession = async (
  sessionId,
  userIdB,
) => {
  await models.Session.update({
    user_b_id: userIdB,
  }, {
    where: {
      id: sessionId,
    },
  });
};

module.exports = {
  getAllSessions,
  getActiveSessionsForUser,
  getSessionByJoinCode,
  createSession,
  joinSession,
};
