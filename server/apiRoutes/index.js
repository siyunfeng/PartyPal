const router = require('express').Router();
const { userRouter } = require('./users');
const { singleCatererRouter } = require('./singleCaterer');

router.use('/users', userRouter);
router.use('/caterer', singleCatererRouter);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  error.message = 'Could not find that resource';
  next(error);
});

module.exports = router;
