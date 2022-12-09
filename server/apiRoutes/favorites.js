const favoritesRouter = require('express').Router();
const { Favorite, User } = require('../db');
const { requireToken } = require('./gateKeepingMiddleware');

// GET /api/favorites/:userId (get user's favorites)
favoritesRouter.get('/:userId', requireToken, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userFavorite = await Favorite.findAll({ where: { userId: userId } });
    // userFavorite is an array with objects(favorite.id, favorite.name)
    if (userFavorite) {
      res.send(userFavorite);
    } else {
      res.send('no favorite');
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/favorite/venue/:yelpReferenceId (save/like venue in favorite)
favoritesRouter.post(
  '/venue/:yelpReferenceId',
  requireToken,
  async (req, res, next) => {
    try {
      const yelp_Reference_Id = req.params.yelpReferenceId;
      const venueInfo = req.body;
      const { token } = req.body;

      const userToAddLikedItemTo = await User.findByToken(token);

      const existingFavorite = await Favorite.findOne({
        where: {
          yelp_reference_id: yelp_Reference_Id,
          userId: userToAddLikedItemTo.id,
        },
      });

      if (existingFavorite) {
        res.send('Already liked item').status(200);
      } else {
        const savedItem = await Favorite.create({
          name: venueInfo.name,
          category: venueInfo.category,
          yelp_reference_id: yelp_Reference_Id,
          image_url: venueInfo.image_url[0],
          userId: userToAddLikedItemTo.id,
        });
        res.send(savedItem).status(200);
      }
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/favorite/venue/:yelpReferenceId (save/like venue in favorite)
favoritesRouter.post(
  '/caterer/:yelpReferenceId',
  // requireToken,
  async (req, res, next) => {
    try {
      const yelp_reference_id = req.params.yelpReferenceId

      const catererInfo = req.body;

      const { token } = req.body;

      const userToAddLikedItemTo = await User.findByToken(token);

      const existingFavorite = await Favorite.findOne({
        where: {
          yelp_reference_id: yelp_reference_id,
          userId: userToAddLikedItemTo.id,
        },
      });
      if (existingFavorite) {
        res.send('Already liked item').status(200);
      } else {
        const savedItem = await Favorite.create({
          name: catererInfo.name,
          category: catererInfo.category,
          // yelp_reference_id: catererInfo.id,
          yelp_reference_id: yelp_reference_id,
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

// DELETE /api/favorites/deleteVenue/:favoriteId (delete venue from favorite)
favoritesRouter.delete(
  '/deleteVenue/:favoriteId',
  requireToken,
  async (req, res, next) => {
    try {
      const { favoriteId } = req.params;
      const token = req.headers.authorization;
      const userToDeleteItemFrom = await User.findByToken(token);
      const itemDeleted = await Favorite.findOne({
        where: {
          id: favoriteId,
          userId: userToDeleteItemFrom.id,
        },
      });
      await itemDeleted.destroy();
      res.send(itemDeleted).status(200);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/favorites/deleteCaterer/:favoriteId (delete caterer from favorite)
favoritesRouter.delete(
  '/deleteCaterer/:favoriteId',
  requireToken,
  async (req, res, next) => {
    try {
      const { favoriteId } = req.params;
      const token = req.headers.authorization;

      const userToDeleteItemFrom = await User.findByToken(token);
      const itemDeleted = await Favorite.findOne({
        where: {
          id: favoriteId,
          userId: userToDeleteItemFrom.id,
        },
      });
      await itemDeleted.destroy();
      res.send(itemDeleted).status(200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = favoritesRouter;
