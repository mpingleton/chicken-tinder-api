const sessionService = require('../services/session.service');

const getAllSessions = async (req, res) => {
  const sessions = await sessionService.getAllSessions();

  const responseData = sessions.map((session) => ({
    id: session.id,
    status: session.status,
    joinCode: session.join_code,
    userIdA: session.user_a_id,
    userIdB: session.user_b_id,
  }));

  res.send(200, responseData);
};

module.exports = {
  getAllSessions,
};
