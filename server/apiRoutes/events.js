const eventsRouter = require('express').Router();
const { Event } = require('../db');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

// GET user's events
// NEED TO PUT IT BACK TO ROUTER requireToken
eventsRouter.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userEvent = await Event.findAll({ where: { userId: userId } });
    // console.log('userEvent =', userEvent);
    if (userEvent) {
      res.send(userEvent);
    } else {
      res.send('no event');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = eventsRouter;
