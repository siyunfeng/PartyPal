const { db } = require("./database");
const { User } = require("./models/User");
const Event = require("./models/events");

const syncAndSeed = async () => {
  try {
    await db.authenticate();
    // this erases users everytime database starts over - DELETE BEFORE DEPLOYING
    await db.sync({ force: true });
    const users = [
      { username: "iraisv", password: "1234" },
      { username: "yuri", password: "abcd" },
    ];

    const events = await Promise.all([
      Event.create({
        name: "Yuri's Sweet 16",
        date: "2022-11-28",
        time: "7:00pm",
        venue: 1,
        catering: 1,
        notes: "Sweet 16 party for Yuri in Palm Springs, hooray!",
      }),
      Event.create({
        name: "Jacob's Grad Party",
        date: "2022-11-29",
        time: "7:00pm",
        venue: 2,
        catering: 2,
        notes: "Grad party for Jacob in Coachella, hooray!",
      }),
      Event.create({
        name: "Kirk's Birthday Party",
        date: "2022-11-30",
        time: "7:00pm",
        venue: 3,
        catering: 3,
        notes: "Birthday party for Kirk in Bay Ridge, hooray!",
      }),
    ]);
    
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
