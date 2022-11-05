const { db } = require("./database");
const { User } = require("./models/User");

const syncAndSeed = async () => {
  try {
    await db.authenticate();
    // this erases users everytime database starts over - DELETE BEFORE DEPLOYING
    await db.sync({ force: true });
    const users = [
      { username: "iraisv", password: "1234" },
      { username: "yuri", password: "abcd" },
    ];
    const [iraisv, yuri] = await Promise.all(
      users.map((user) => {
        User.create(user);
      })
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  syncAndSeed,
};
