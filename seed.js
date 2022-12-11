const { db, User, Favorite, Event } = require('./server/db/');

const syncAndSeed = async () => {
  try {
    await db.authenticate();
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
        name: `Yuri's Sweet 16`,
        date: '2023-01-10',
        time: '15:00',
        venue: 'Casa de Monte Vista',
        venueYelpId: 'CAR_j1RGyyk1dm_OPHtA6w',
        catering: 'The Sunflower',
        cateringYelpId: 'uAvZBHgtF7fhBtjdSgi69g',
        notes: `Sweet 16 party for Yuri in Palm Springs, hooray!`,
      }),
      Event.create({
        name: '2023 New Year Party(California)',
        date: '2022-12-31',
        time: '22:00',
        venue: 'The Green Room',
        venueYelpId: 't2i3XskWAAPn6A7dpZLNAA',
        catering: 'Loritos Grill',
        cateringYelpId: 'BByzInVt9bzToIEUoIwFZA',
        notes: `2023 New Year Party in California, hooray!`,
      }),
      Event.create({
        name: `Jane's Grad Party`,
        date: '2022-12-17',
        time: '13:00',
        venue: `Stumpy's Hatchet House - Princeton`,
        venueYelpId: 'Vu-mW-O8Gv1Jvycvczr5yw',
        catering: 'Margari Pizza',
        cateringYelpId: 'IbTOahV7PjkYwVDsGlfseA',
        notes: `Grad party for Jane in New Jersey, hooray!`,
      }),
      Event.create({
        name: '2023 New Year Party(Boston)',
        date: '2023-01-01',
        time: '18:00',
        venue: 'SPIN Boston',
        venueYelpId: 'KdPIqoR5NqpcnOAKZZEONQ',
        catering: 'Needham House of Pizza',
        cateringYelpId: 'OStPItUGTxf79XLcA6R-vg',
        notes: `2023 New Year Party in Boston, hooray!`,
      }),
      Event.create({
        name: `Jane's Birthday Party`,
        date: '2023-07-02',
        time: '14:00',
        venue: `Chef's Dinner Table`,
        venueYelpId: 'JRUmFE_C3B91F_blD6k4Rg',
        catering: 'Havana Central',
        cateringYelpId: '1slRbWWMRkQahpuVOOfSWw',
        notes: `Birthday party for Jane in NYC, hooray!`,
      }),
      Event.create({
        name: `Irais's Grad Party`,
        date: '2022-12-16',
        time: '19:00',
        venue: 'Penthouse 45',
        venueYelpId: 'ElAnd_aOPbm_teBGq_EN1Q',
        catering: 'Fonda Tribeca',
        cateringYelpId: '2kkjzgLwKHFmLAfR86kE3Q',
        notes: `Grad party for Irais in NYC, hooray!`,
      }),
      Event.create({
        name: '2023 New Year Party(California)',
        date: '2022-12-31',
        time: '20:00',
        venue: 'Edgewood Mansion',
        venueYelpId: '2GlX0MMoZUP1F4h5ioOgQA',
        catering: 'Frijoles',
        cateringYelpId: 'lq5kk09UiJYUDe7BbMUJJg',
        notes: `2023 New Year Party in California, hooray!`,
      }),
      Event.create({
        name: 'Family Reunion',
        date: '2023-02-21',
        time: '13:00',
        venue: `Crazzy's Wasewagan Camp & Retreat`,
        venueYelpId: 'kb6tDcjFWA74_-9VKwslWg',
        catering: 'Carnitas El Artista',
        cateringYelpId: 'Z9JCFvunfndxoUeqb4ekXg',
        notes: `Need to double check everyone's preference before confirming catering menu`,
      }),
      Event.create({
        name: `Siyun's Grad Party`,
        date: '2022-12-16',
        time: '19:00',
        venue: 'WAYLA Lounge',
        venueYelpId: 'iIQpCFxdf68Q62J1Vavmcg',
        catering: 'Fabarnak Community Cafe and Catering',
        cateringYelpId: '3ohJ9WQLb5Cbb_j1zdJ-xg',
        notes: `Grad party for Siyun in Toronto, hooray!`,
      }),
      Event.create({
        name: '2023 New Year Party(NYC)',
        date: '2023-01-01',
        time: '13:00',
        venue: 'Bat Haus',
        venueYelpId: 'tDXIZdoIe2Ma6dQhExwf8A',
        catering: 'Portable Provisions',
        cateringYelpId: 'u3iFoYMr4-jAeVlPOAoUlQ',
        notes: `2023 New Year Party in NYC, hooray!`,
      }),
      Event.create({
        name: `Chinese New Year Party`,
        date: '2023-01-22',
        time: '12:30',
        venue: 'The Press Lounge',
        venueYelpId: 'nCH7SR7qXu0asO1GU3iqHw',
        catering: 'Top Tier Catering',
        cateringYelpId: '4Ks2rOz5clO8djXZgBj8wQ',
        notes: 'Make sure order some vegan food for catering',
      }),
    ]);

    const [iraisv, yuri, siyun, jane] = await User.bulkCreate(users, {
      validate: true,
    });

    const favorite = [
      {
        name: 'Casa de Monte Vista',
        category: 'venue',
        yelp_reference_id: 'CAR_j1RGyyk1dm_OPHtA6w',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/cBklmiZSavUIfI4cL72DKw/o.jpg',
      },
      {
        name: 'The Sunflower',
        category: 'caterer',
        yelp_reference_id: 'uAvZBHgtF7fhBtjdSgi69g',
        image_url:
          'https://s3-media1.fl.yelpcdn.com/bphoto/Bh2WYEBPRW0k4OvWJ6RpDQ/o.jpg',
      },
      {
        name: 'Loritos Grill',
        category: 'caterer',
        yelp_reference_id: 'BByzInVt9bzToIEUoIwFZA',
        image_url:
          'https://s3-media4.fl.yelpcdn.com/bphoto/wKYK-zsb-RR9HQ1zIWsR7Q/o.jpg',
      },
      {
        name: 'The Green Room',
        category: 'venue',
        yelp_reference_id: 't2i3XskWAAPn6A7dpZLNAA',
        image_url:
          'https://s3-media4.fl.yelpcdn.com/bphoto/MQFiHvq2sPkBAFBj4smVgA/o.jpg',
      },
      {
        name: 'Margari Pizza',
        category: 'caterer',
        yelp_reference_id: 'IbTOahV7PjkYwVDsGlfseA',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/QeyCh_L0xriUmgc8oXWN6w/o.jpg',
      },
      {
        name: `Stumpy's Hatchet House - Princeton`,
        category: 'venue',
        yelp_reference_id: 'Vu-mW-O8Gv1Jvycvczr5yw',
        image_url:
          'https://s3-media2.fl.yelpcdn.com/bphoto/xtrzEtGD7Xky1KXKN0pGlQ/o.jpg',
      },
      {
        name: 'Needham House of Pizza',
        category: 'caterer',
        yelp_reference_id: 'OStPItUGTxf79XLcA6R-vg',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/dAjy1GnRK9q5otv866J3Pg/o.jpg',
      },
      {
        name: 'SPIN Boston',
        category: 'venue',
        yelp_reference_id: 'KdPIqoR5NqpcnOAKZZEONQ',
        image_url:
          'https://s3-media2.fl.yelpcdn.com/bphoto/QalMkYQgsaJMuzj5_Jgb5w/o.jpg',
      },
      {
        name: 'Penthouse 45',
        category: 'venue',
        yelp_reference_id: 'ElAnd_aOPbm_teBGq_EN1Q',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/mJAnWY8GK2LMEMijj_RJ8g/o.jpg',
      },
      {
        name: 'Fonda Tribeca',
        category: 'caterer',
        yelp_reference_id: '2kkjzgLwKHFmLAfR86kE3Q',
        image_url:
          'https://s3-media2.fl.yelpcdn.com/bphoto/fd7ukzb7VENp1EN8F0PPIA/o.jpg',
      },
      {
        name: 'Fabarnak Community Cafe and Catering',
        category: 'caterer',
        yelp_reference_id: '3ohJ9WQLb5Cbb_j1zdJ-xg',
        image_url:
          'https://s3-media2.fl.yelpcdn.com/bphoto/gazch_Pj9w-F5c-aIeGbDg/o.jpg',
      },
      {
        name: 'WAYLA Lounge',
        category: 'venue',
        yelp_reference_id: 'iIQpCFxdf68Q62J1Vavmcg',
        image_url:
          'https://s3-media1.fl.yelpcdn.com/bphoto/LRI2aFdpj2ABA1958nmraw/o.jpg',
      },
      {
        name: 'Bat Haus',
        category: 'venue',
        yelp_reference_id: 'tDXIZdoIe2Ma6dQhExwf8A',
        image_url:
          'https://s3-media1.fl.yelpcdn.com/bphoto/CGf-0Vgu9kmaA3r4jQA4Xg/o.jpg',
      },
      {
        name: 'Portable Provisions',
        category: 'caterer',
        yelp_reference_id: 'u3iFoYMr4-jAeVlPOAoUlQ',
        image_url:
          'https://s3-media2.fl.yelpcdn.com/bphoto/APRSn5lzv5CYjmk9RluyLg/o.jpg',
      },
      {
        name: 'Top Tier Catering',
        category: 'caterer',
        yelp_reference_id: '4Ks2rOz5clO8djXZgBj8wQ',
        image_url:
          'https://s3-media1.fl.yelpcdn.com/bphoto/-cpa4l7LpkpG-ZB-6zfNFA/o.jpg',
      },
      {
        name: 'The Press Lounge',
        category: 'venue',
        yelp_reference_id: 'nCH7SR7qXu0asO1GU3iqHw',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/dMduwCNuPjcPN5K-xMA7Uw/o.jpg',
      },
      {
        name: `Chef's Dinner Table`,
        category: 'venue',
        yelp_reference_id: 'JRUmFE_C3B91F_blD6k4Rg',
        image_url:
          'https://s3-media2.fl.yelpcdn.com/bphoto/PvmKGCkYLnR2ZLks4ctltw/o.jpg',
      },
      {
        name: 'Havana Central',
        category: 'caterer',
        yelp_reference_id: '1slRbWWMRkQahpuVOOfSWw',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/-bIrOEHHsan7Vqu1GJDJHA/o.jpg',
      },
      {
        name: 'Carnitas El Artista',
        category: 'caterer',
        yelp_reference_id: 'Z9JCFvunfndxoUeqb4ekXg',
        image_url:
          'https://s3-media4.fl.yelpcdn.com/bphoto/YcaXcZZuR_1kGt01Wt2sMg/o.jpg',
      },
      {
        name: `Crazzy's Wasewagan Camp & Retreat`,
        category: 'caterer',
        yelp_reference_id: 'kb6tDcjFWA74_-9VKwslWg',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/PQiiQt_ZgSUVB9uLNngRcQ/o.jpg',
      },
      {
        name: 'Edgewood Mansion',
        category: 'venue',
        yelp_reference_id: '2GlX0MMoZUP1F4h5ioOgQA',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/a8l_PrQSkA_GewJAPu_d1Q/o.jpg',
      },
      {
        name: 'Frijoles',
        category: 'caterer',
        yelp_reference_id: 'lq5kk09UiJYUDe7BbMUJJg',
        image_url:
          'https://s3-media4.fl.yelpcdn.com/bphoto/Qy7lnRf_lDCBqDZ-k6A0kg/o.jpg',
      },
    ];

    const [
      casaDeMonteVista,
      theSunflower,
      loritosGrill,
      theGreenRoom,
      margariPizza,
      stumpysHatchetHouse,
      needhamHouseOfPizza,
      spinBoston,
      penthouse45,
      fondaTribeca,
      fabarnakCafe,
      waylaLounge,
      batHaus,
      portableProvisions,
      topTierCatering,
      thePressLounge,
      chefsDinnerTable,
      havanaCentral,
      carnitasElArtista,
      crazzyWasewaganCamp,
      edgewoodMansion,
      frijoles,
    ] = await Favorite.bulkCreate(favorite, {
      validate: true,
    });

    await events[0].setUser(yuri);
    await events[1].setUser(yuri);
    await events[2].setUser(jane);
    await events[3].setUser(jane);
    await events[4].setUser(jane);
    await events[5].setUser(iraisv);
    await events[6].setUser(iraisv);
    await events[7].setUser(iraisv);
    await events[8].setUser(siyun);
    await events[9].setUser(siyun);
    await events[10].setUser(siyun);

    await casaDeMonteVista.setUser(yuri);
    await theSunflower.setUser(yuri);
    await loritosGrill.setUser(yuri);
    await theGreenRoom.setUser(yuri);

    await margariPizza.setUser(jane);
    await stumpysHatchetHouse.setUser(jane);
    await needhamHouseOfPizza.setUser(jane);
    await spinBoston.setUser(jane);
    await chefsDinnerTable.setUser(jane);
    await havanaCentral.setUser(jane);

    await penthouse45.setUser(iraisv);
    await fondaTribeca.setUser(iraisv);
    await carnitasElArtista.setUser(iraisv);
    await crazzyWasewaganCamp.setUser(iraisv);
    await edgewoodMansion.setUser(iraisv);
    await frijoles.setUser(iraisv);

    await fabarnakCafe.setUser(siyun);
    await waylaLounge.setUser(siyun);
    await batHaus.setUser(siyun);
    await portableProvisions.setUser(siyun);
    await topTierCatering.setUser(siyun);
    await thePressLounge.setUser(siyun);

    console.log('seed completed!');
  } catch (error) {
    console.log(error);
  }
};

syncAndSeed();

module.exports = {
  syncAndSeed,
};
