const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const { syncAndSeed } = require("./db/seed");
const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require("./apiRoutes"));
app.use("/auth", require("./apiRoutes/auth"));

if (process.env.NODE_ENV !== "production") require("../secrets")
const SECRET = process.env.SECRET

app.get("/", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  } catch (error) {
    next(error);
  }
});

app.use("*", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  console.error(error.stack);
  res
    .status(error.status || 500)
    .send(error.message || "Internal Server error");
});

syncAndSeed();

app.listen(3019, () => console.log("listening on port 3019"));

module.exports = app;
