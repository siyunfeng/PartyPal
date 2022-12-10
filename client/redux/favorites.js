import axios from 'axios';
const TOKEN = 'token';

const GET_FAVORITE_VENUES = 'GET_FAVORITE_VENUES';
const GET_FAVORITE_CATERER = 'GET_FAVORITE_CATERER';

const DELETE_LIKED_VENUE_ITEM = 'DELETE_LIKED_VENUE_ITEM';
const DELETE_LIKED_CATERER_ITEM = 'DELETE_LIKED_CATERER_ITEM';

const _getFavoriteVenues = (venues) => ({ type: GET_FAVORITE_VENUES, venues });
const _getFavoriteCaterers = (caterers) => ({
  type: GET_FAVORITE_CATERER,
  caterers,
});

const _deleteLikedVenueItem = (venue) => {
  return {
    type: DELETE_LIKED_VENUE_ITEM,
    venue,
  };
};

const _deleteLikedCatererItem = (caterer) => {
  return {
    type: DELETE_LIKED_CATERER_ITEM,
    caterer,
  };
};

export const getFavorites = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: favorites } = await axios.get(`/api/favorites/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      const favoriteVenues = favorites.filter(
        (favorite) => favorite.category === 'venue'
      );
      const favoriteCaterers = favorites.filter(
        (favorite) => favorite.category === 'caterer'
      );
      if (favoriteVenues.length) {
        dispatch(_getFavoriteVenues(favoriteVenues));
      }
      if (favoriteCaterers.length) {
        dispatch(_getFavoriteCaterers(favoriteCaterers));
      }
    } catch (error) {
      console.error('redux/events.js getEvents error >>>>', error);
    }
  };
};

export const deleteVenueLikedItem = (favoriteId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/favorites/deleteVenue/${favoriteId}`,
        {
          headers: {
            authorization: window.localStorage.getItem(TOKEN),
          },
        }
      );
      dispatch(_deleteLikedVenueItem(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCatererLikedItem = (favoriteId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/favorites/deleteCaterer/${favoriteId}`,
        {
          headers: {
            authorization: window.localStorage.getItem(TOKEN),
          },
        }
      );
      dispatch(_deleteLikedCatererItem(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const favorites = (state = {}, action) => {
  switch (action.type) {
    case GET_FAVORITE_VENUES:
      const venues = action.venues;
      return { ...state, venues: venues };
    case GET_FAVORITE_CATERER:
      const caterers = action.caterers;
      return { ...state, caterers: caterers };
    case DELETE_LIKED_VENUE_ITEM:
      const newVenues = state.venues.filter(
        (venue) => venue.id !== action.venue.id
      );
      return { ...state, venues: newVenues };
    case DELETE_LIKED_CATERER_ITEM:
      const newCaterers = state.caterers.filter(
        (caterer) => caterer.id !== action.caterer.id
      );
      return { ...state, caterers: newCaterers };
    default:
      return state;
  }
};

export default favorites;
