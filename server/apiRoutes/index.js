const router = require('express').Router();
const { userRouter } = require('./users');
const { caterersRouter } = require('./caterers');

router.use('/users', userRouter);
router.use('/caterers', caterersRouter);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  error.message = 'Could not find that resource';
  next(error);
});

module.exports = router;
