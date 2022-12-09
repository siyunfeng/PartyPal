// store all of our functions that will act as middleware between our request and response
const { User } = require('../db/models/User');

const requireToken = async (req, res, next) => {
  console.log('IN REQUIRE TOKEN')
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403).send('You shall not pass!');
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
