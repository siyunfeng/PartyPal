const saveLikedItemsRouter = require('express').Router();

const { Favorite, User } = require('../db/index');

// saving venue
saveLikedItemsRouter.post('/venue/:yelpReferenceId', async (req, res, next) => {
  try {
    const yelpReferenceId = req.params.yelpReferenceId;
    const venueInfo = req.body;
    const { token } = req.body;

    const userToAddLikedItemTo = await User.findByToken(token);

    const existingFavorite = await Favorite.findOne({
      where: {
        yelp_reference_id: yelpReferenceId,
        userId: userToAddLikedItemTo.id,
      },
    });
    if (existingFavorite) {
      res.send('Already liked item').status(200);
    } else {
      const savedItem = await Favorite.create({
        name: venueInfo.name,
        category: venueInfo.category,
        yelp_reference_id: yelpReferenceId,
        image_url: venueInfo.image_url[0],
        // hard coding to 1 until login works
        userId: userToAddLikedItemTo.id,
      });
      res.send(savedItem).status(200);
    }
  } catch (error) {
    next(error);
  }
});

//saving caterer
saveLikedItemsRouter.post(
  '/caterer/:yelpReferenceId',
  async (req, res, next) => {
    try {
      const yelpReferenceId = req.params.yelpReferenceId;
      const catererInfo = req.body;
      const { token } = req.body;

      const userToAddLikedItemTo = await User.findByToken(token);

      const existingFavorite = await Favorite.findOne({
        where: {
          yelp_reference_id: yelpReferenceId,
          userId: userToAddLikedItemTo.id,
        },
      });
      if (existingFavorite) {
        res.send('Already liked item').status(200);
      } else {
        const savedItem = await Favorite.create({
          name: catererInfo.name,
          category: catererInfo.category,
          yelp_reference_id: yelpReferenceId,
          image_url: catererInfo.image_url[0],
          userId: userToAddLikedItemTo.id,
        });
        res.send(savedItem).status(200);
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = saveLikedItemsRouter;
