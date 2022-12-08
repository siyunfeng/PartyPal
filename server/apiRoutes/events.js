const eventsRouter = require('express').Router();
const { Event } = require('../db');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

// GET user's events
// NEED TO PUT IT BACK TO ROUTER requireToken
eventsRouter.get('/:userId', requireToken, async (req, res, next) => {
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
    console.log(`api/events get('/:userId') ERROR:`, error);
    next(error);
  }
});

// edit event detail
eventsRouter.put('/:eventId', async (req, res, next) => {
  try {
    const eventToUpdate = await Event.findByPk(req.params.eventId);
    eventToUpdate.update(req.body);
    res.send(eventToUpdate);
  } catch (error) {
    next(error);
  }
});

// create an event as a logged in user
// add middleware
eventsRouter.post('/', async (req, res, next) => {
  try {
    const newEvent = await Event.create(req.body);
    // console.log('INSIDE eventsRouter POST >>> newEvent =', newEvent);
    res.send(newEvent);
  } catch (error) {
    next(error);
  }
});

// delete an event as a logged in user
eventsRouter.delete('/:eventId', async (req, res, next) => {
  try {
    const eventToDelete = await Event.findByPk(req.params.eventId);
    await eventToDelete.destroy();
    res.send(eventToDelete);
  } catch (error) {
    next(error);
  }
});

module.exports = eventsRouter;
