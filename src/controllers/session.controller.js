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

const getCurrentActiveSessionForMe = async (req, res) => {
  const sessions = await sessionService.getActiveSessionsForUser(req.user.userId);
  if (sessions.length === 0) {
    res.send(200, []);
  } else if (sessions.length === 1) {
    const responseData = {
      id: sessions[0].id,
      status: sessions[0].status,
      joinCode: sessions[0].join_code,
      userIdA: sessions[0].user_a_id,
      userIdB: sessions[0].user_b_id,
    };
    res.send(200, responseData);
  } else {
    res.send(500);
  }
};

module.exports = {
  getAllSessions,
  getCurrentActiveSessionForMe,
};
