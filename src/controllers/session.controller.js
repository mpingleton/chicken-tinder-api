const sessionService = require('../services/session.service');

const getAllSessions = async (req, res) => {
  const sessions = await sessionService.getAllSessions();

  const responseData = sessions.map((session) => ({
    id: session.id,
    status: session.status,
    joinCode: session.join_code,
    userIdA: session.user_a_id,
    userIdB: session.user_b_id,
    location: session.location,
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
      location: sessions[0].location,
    };
    res.send(200, responseData);
  } else {
    res.send(500);
  }
};

const createSession = async (req, res) => {

  // Make sure there isn't another active session for this user.
  const activeSessions = await sessionService.getActiveSessionsForUser(req.user.userId);
  if(activeSessions.length > 0) {
    res.send(403, "An active session already exists for this user.");
    return;
  }

  while (1) {
    // Generate a random string of characters to use as a join code.
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let joinCode = '';
    for (let i = 0; i < 10; i += 1) {
      const randomNumber = Math.floor(Math.random() * charSet.length);
      joinCode += charSet[randomNumber];
    }

    // Make sure there isn't another session with this join code.
    const session = await sessionService.getSessionByJoinCode(joinCode);
    if (session === null) {
      // Insert new session into database.
      await sessionService.createSession(
        1,
        req.user.userId,
        undefined,
        joinCode,
        req.body.location,
      );

      res.send(201, { joinCode });
      break;
    }
  }

};

const joinSession = async (req, res) => {

  // Make sure there isn't another active session for this user.
  const activeSessions = await sessionService.getActiveSessionsForUser(req.user.userId);
  if(activeSessions.length > 0) {
    res.send(403, "An active session already exists for this user.");
    return;
  }

  // Find the session matching the provided join code.  Make sure we are able to join.
  const session = await sessionService.getSessionByJoinCode(req.body.joinCode);
  console.log(session);
  if (session === null) {
    res.send(404, "No existing session with this join code was found.");
    return;
  } else if (session.user_b_id != null) {
    res.send(403, "This session has already been joined by another user.");
    return;
  }

  // Make the join happen.
  await sessionService.joinSession(session.id, req.user.userId);
  res.send(200);
};

module.exports = {
  getAllSessions,
  getCurrentActiveSessionForMe,
  createSession,
  joinSession,
};
