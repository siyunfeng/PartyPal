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
        date: '2022-12-28',
        time: '7:00pm',
        venue: 1,
        catering: 1,
        notes: 'Sweet 16 party for Yuri in Palm Springs, hooray!',
      }),
      Event.create({
        name: "Siyun's Grad Party",
        date: '2022-12-16',
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
      Event.create({
        name: "Irais's Grad Party",
        date: '2022-12-16',
        time: '7:00pm',
        venue: 2,
        catering: 2,
        notes: 'Grad party for Irais in NYC, hooray!',
      }),
      Event.create({
        name: "Jane's Grad Party",
        date: '2022-12-16',
        time: '7:00pm',
        venue: 2,
        catering: 2,
        notes: 'Grad party for Jane in New Jersey, hooray!',
      }),
      Event.create({
        name: '2023 New Year Party(Buffalo)',
        date: '2022-12-31',
        time: '9:00pm',
        venue: 4,
        catering: 1,
        notes: '2023 New Year Party in NYC, hooray!',
      }),
      Event.create({
        name: '2023 New Year Party(NYC)',
        date: '2022-12-31',
        time: '10:00pm',
        venue: 3,
        catering: 2,
        notes: '2023 New Year Party in NYC, hooray!',
      }),
      Event.create({
        name: '2023 New Year Party(New Jersey)',
        date: '2022-12-31',
        time: '11:00pm',
        venue: 3,
        catering: 3,
        notes: '2023 New Year Party in New Jersey, hooray!',
      }),
      Event.create({
        name: '2023 New Year Party(California)',
        date: '2022-12-31',
        time: '11:30pm',
        venue: 1,
        catering: 3,
        notes: '2023 New Year Party in California, hooray!',
      }),
    ]);

    const [iraisv, yuri, siyun, jane] = await User.bulkCreate(users, {
      validate: true,
    });

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
      {
        name: 'Naturally Delicious',
        category: 'venue',
        yelp_reference_id: 'CDE123',
      },
      {
        name: 'The Foundry',
        category: 'venue',
        yelp_reference_id: 'FGH123',
      },
      {
        name: 'Fallier Food',
        category: 'caterer',
        yelp_reference_id: 'IJK123',
      },
      {
        name: 'Tribeca Rooftop',
        category: 'venue',
        yelp_reference_id: 'LMN123',
      },
      {
        name: 'Cocktail Caterers',
        category: 'caterer',
        yelp_reference_id: 'OPQ123',
      },
      {
        name: 'The Dumbo Loft',
        category: 'venue',
        yelp_reference_id: 'XYZ456',
      },
    ];

    const [
      HappyPonyBakery,
      Ballroom,
      NaturallyDelicious,
      TheFoundry,
      FallierFood,
      TribecaRooftop,
      CocktailCaterers,
      TheDumboLoft,
    ] = await Favorite.bulkCreate(favorite, {
      validate: true,
    });

    await events[0].setUser(yuri);
    await events[1].setUser(siyun);
    await events[2].setUser(jane);
    await events[3].setUser(iraisv);
    await events[4].setUser(jane);
    await events[5].setUser(siyun);
    await events[6].setUser(iraisv);
    await events[7].setUser(jane);
    await events[8].setUser(yuri);

    await HappyPonyBakery.setUser(jane);
    await Ballroom.setUser(jane);
    await NaturallyDelicious.setUser(yuri);
    await TheFoundry.setUser(yuri);
    await FallierFood.setUser(iraisv);
    await TribecaRooftop.setUser(iraisv);
    await CocktailCaterers.setUser(siyun);
    await TheDumboLoft.setUser(siyun);
  } catch (error) {
    console.log(error);
  }
};

syncAndSeed();

module.exports = {
  syncAndSeed,
};
