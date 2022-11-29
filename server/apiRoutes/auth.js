const authRouter = require("express").Router();
const { User } = require("../db/models/User");

authRouter.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})

authRouter.post(`/login`, async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (error) {
    next(error);
  }
});


authRouter.post("/signup", async (req, res, next) => {
  try {
    const { username, password } = req.body; 
    // only getting username and password off req.body
    // so we only add to those fields in database
    // any routes recieving front end data
    const user = await User.create({ username, password });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

module.exports = authRouter;
