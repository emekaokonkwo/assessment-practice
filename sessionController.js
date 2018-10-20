const Session = require('./sessionSchema');

module.exports = {
  setSessionCookie: (req, res, next) => {
    const { username } = req.body;
    // console.log(1);
    res.cookie('sessionId', username);
    next();
  },
  startSession: (req, res, next) => {
    const { username } = req.body;
    // console.log(username);
    Session.create({ sessionId: username })
      .then(() => {
        console.log('Session created');
        return next();
      })
      .catch(err => console.log(err));
  },
};
