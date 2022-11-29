const { db, User, Favorite, Event } = require('./server/db/');

const syncAndSeed = async () => {
  try {
    await db.authenticate();
    // this erases users everytime database starts over - DELETE BEFORE DEPLOYING
    await db.sync({ force: true });
    const users = [
      {
        username: 'iraisv',
        password: '1234',
        firstName: 'Irais',
        lastName: 'Valenzuela',
        email: 'iraisv@partypal.com',
      },
      {
        username: 'yuri',
        password: 'abcd',
        firstName: 'Yuri',
        lastName: 'Valenzuela',
        email: 'yuriv@partypal.com',
      },
      {
        username: 'siyun',
        password: 'siyunf',
        firstName: 'Siyun',
        lastName: 'Feng',
        email: 'siyunf@partypal.com',
      },
      {
        username: 'jane',
        password: 'janey',
        firstName: 'Jane',
        lastName: 'Yeh',
        email: 'janey@partypal.com',
      },
    ];

    const events = await Promise.all([
      Event.create({
        name: "Yuri's Sweet 16",
        date: '2022-11-28',
        time: '7:00pm',
        venue: 1,
        catering: 1,
        notes: 'Sweet 16 party for Yuri in Palm Springs, hooray!',
      }),
      Event.create({
        name: "Siyun's Grad Party",
        date: '2022-11-29',
        time: '7:00pm',
        venue: 2,
        catering: 2,
        notes: 'Grad party for Siyun in Buffalo, hooray!',
      }),
      Event.create({
        name: "Jane's Birthday Party",
        date: '2022-11-30',
        time: '7:00pm',
        venue: 3,
        catering: 3,
        notes: 'Birthday party for Jane in NYC, hooray!',
      }),
    ]);

    const [iraisv, yuri, siyun, jane] = await User.bulkCreate(users, { validate: true })
      
    const favorite = [
      {
        name: 'Happy Pony Bakery',
        category: 'caterer',
        yelp_reference_id: 'ABC123',
      },
      {
        name: 'Ballroom',
        category: 'venue',
        yelp_reference_id: 'XYZ123',
      },
    ];

    const [HappyPonyBakery, Ballroom] = await Favorite.bulkCreate(favorite, { validate: true })

    await events[0].setUser(yuri)
    await events[1].setUser(siyun)
    await events[2].setUser(jane)
    await HappyPonyBakery.setUser(jane)
    await Ballroom.setUser(siyun)


  } catch (error) {
    console.log(error);
  }
};

syncAndSeed();

module.exports = {
  syncAndSeed,
};
