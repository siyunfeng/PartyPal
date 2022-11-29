const express = require('express');
const userRouter = express.Router();
const { User } = require('../db/models/User');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

// GET user's info
userRouter.get('/', requireToken, async (req, res, next) => {
  // before running route run this gatekeeping middleware
  // if we make it passed that middleware we have a user
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({
      where: { username: username, password: password },
    });
    if (existingUser) {
      res.send(existingUser);
    } else {
      res.send('Incorrect username or password. Please try again.');
    }
  } catch (error) {
    next(error);
  }
});

// POST create new user
userRouter.post('/', requireToken, async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, email } = req.body;
    const newUser = await User.create({
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    res.send(newUser).status(200);
  } catch (error) {
    next(error);
  }
});

// PUT change existing user's info
userRouter.put('/:userId', requireToken, async (req, res, next) => {
  try {
    const { password } = req.body;
    /* only allow user to update their password and email? (because username & name should not be changed?) */
    const existingUser = await User.findByPk(req.params.userId);
    let updateInfo;
    if (password) {
      updateInfo = await existingUser.update({
        password: password,
      });
    }
    res.send(updateInfo).status(200);
  } catch (error) {
    next(error);
  }
});

// DELETE (QUESTION: only admin can delete user or user can cancel their account?)
userRouter.delete('/userId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const deleteUser = await User.destroy(req.params.userId);
    res.send(deleteUser).status(200);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  userRouter,
};
