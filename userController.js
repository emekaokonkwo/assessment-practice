const User = require('./schema');

module.exports = {
  verifyUser: (req, res, next) => {
    const { username, password } = req.body;

    User.findOne({ username, password })
      .then((data) => {
        // console.log(data);
        if (data === null) {
          res.locals.verified = false;
        } else {
          res.locals.verified = true;
        }
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
