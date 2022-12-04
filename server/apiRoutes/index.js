const router = require('express').Router();
const { userRouter } = require('./users');
const venuesRouter = require('./venues');
const likedItems = require('./likedItems');
const { caterersRouter } = require('./caterers');
const eventsRouter = require('./events');
const favoritesRouter = require('./favorites');

router.use('/users', userRouter);
router.use('/venues', venuesRouter);
router.use('/caterers', caterersRouter);
router.use('/events', eventsRouter);
router.use('/likedItems', likedItems);
router.use('/favorites', favoritesRouter);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  error.message = 'Could not find that resource';
  next(error);
});

module.exports = router;
