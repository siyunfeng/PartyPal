const likedItemsRouter = require('express').Router();
const {requireToken} = require('./gateKeepingMiddleware')

const { Favorite, User } = require('../db/index');

// saving venue
likedItemsRouter.post('/venue/:yelpReferenceId', requireToken, async (req, res, next) => {
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
        userId: userToAddLikedItemTo.id,
      });
      res.send(savedItem).status(200);
    }
  } catch (error) {
    next(error);
  }
});

//saving caterer
likedItemsRouter.post(
  '/caterer/:yelpReferenceId', requireToken,
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

// delete liked venue
likedItemsRouter.delete('/deleteVenue/:yelpReferenceId', async (req, res, next) => {
  try {
    // send token to backend as well so I can find user
    const yelpId = req.params.yelpReferenceId
    const token = req.body.token
    const userToDeleteItemFrom = await User.findByToken(token)
    const itemDeleted = await Favorite.findOne({
      where: {
        yelp_reference_id: yelpId,
        userId: userToDeleteItemFrom.id
      }
    })
    res.send(itemDeleted).status(200)
  } catch (error) {
    next(error)
  }
})

// delete caterer
likedItemsRouter.delete('/deleteCaterer/:yelpReferenceId', async (req, res, next) => {
  try {
    const yelpId = req.params.yelpReferenceId
    const token = req.body.token
    const userToDeleteItemFrom = await User.findByToken(token)
    const itemDeleted = await Favorite.findOne({
      where: {
        yelp_reference_id: yelpId,
        userId: userToDeleteItemFrom.id
      }
    })
    res.send(itemDeleted).status(200)
  } catch (error) {
    next(error)
  }
})



module.exports = likedItemsRouter;
