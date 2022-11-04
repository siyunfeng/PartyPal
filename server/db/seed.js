const { db } = require("./database");
const {User} = require("./models/User")

const syncAndSeed = async () => {
  try {
    await db.authenticate();
    // this erases users everytime database starts over
    await db.sync({ force: true });
    await User.create({ username: "iraisv", password: "1234" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  syncAndSeed,
};
