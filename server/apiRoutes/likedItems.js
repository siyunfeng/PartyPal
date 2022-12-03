const saveLikedItemsRouter = require('express').Router();

const { Favorite, User } = require('../db/index');

saveLikedItemsRouter.post('/:yelpReferenceId',  async (req, res, next) => {
  try {
    const yelpReferenceId = req.params.yelpReferenceId;
    const venueInfo = req.body;

    // when log in works find user by token
    // const userToAddLikedItemTo = await User.findByToken(userToken)

    const savedItem = await Favorite.create({
      name: venueInfo.name,
      category: venueInfo.category,
      yelp_reference_id: yelpReferenceId,
      image_url: venueInfo.image_url[0],
      // hard coding to 1 until login works
      userId: 1,
    });
    res.send(savedItem).status(200);
  } catch (error) {
    next(error);
  }
});

module.exports = saveLikedItemsRouter;
