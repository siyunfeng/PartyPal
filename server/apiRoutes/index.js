const router = require('express').Router();
const { userRouter } = require('./users');
const venuesRouter = require('./venues');
const favoritesRouter = require('./favorites');
const { caterersRouter } = require('./caterers');
const eventsRouter = require('./events');

router.use('/users', userRouter);
router.use('/venues', venuesRouter);
router.use('/caterers', caterersRouter);
router.use('/events', eventsRouter);
router.use('/favorites', favoritesRouter);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  error.message = 'Could not find that resource';
  next(error);
});

module.exports = router;
