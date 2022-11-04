const {db} = require("./server/db/database");
const app = require("./server/index.js");
console.log("db", db)

const port = process.env.PORT || 3019;

db.sync() // sync our database
  .then(function () {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
