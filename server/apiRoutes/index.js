const router = require("express").Router();
const { userRouter } = require("./users");

router.use("/users", userRouter);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  error.message = "Could not find that resource";
  next(error);
});

module.exports = router;
