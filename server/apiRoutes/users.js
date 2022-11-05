const express = require("express");
const userRouter = express.Router();
const { User } = require("../db/models/User");
const {requireToken, isAdmin} = require("./gateKeepingMiddleware")

userRouter.get("/", requireToken, isAdmin,  async (req, res, next) => {
  // before running route run this gatekeeping middleware
  // if we make it passed that middleware we have a user
  try {
    const allUsers = await User.findAll({
      attributes: ['id', 'username'] // information we want back 
    });
    res.send(allUsers);
  } catch (error) {
    next(error)
  }
})

module.exports = {
  userRouter,
};
