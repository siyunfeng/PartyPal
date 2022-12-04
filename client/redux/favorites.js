import axios from 'axios';

const GET_FAVORITE_VENUES = 'GET_FAVORITE_VENUES';
const GET_FAVORITE_CATERER = 'GET_FAVORITE_CATERER';

const _getFavoriteVenues = (venues) => ({ type: GET_FAVORITE_VENUES, venues });
const _getFavoriteCaterers = (caterers) => ({
  type: GET_FAVORITE_CATERER,
  caterers,
});

export const getFavorites = (userId) => {
  return async (dispatch) => {
    try {
      const { data: favorites } = await axios.get(`/api/favorites/${userId}`);
      // favorites is an array with rows that match user id
      console.log(
        'favorites reducer getFavoriteVenues, favorites =',
        favorites
      );
      const favoriteVenues = favorites.filter(
        (favorite) => favorite.category === 'venue'
      );
      const favoriteCaterers = favorites.filter(
        (favorite) => favorite.category === 'caterer'
      );
      console.log(
        'favoriteVenues =',
        favoriteVenues,
        'favoriteCaterers =',
        favoriteCaterers
      );
      if (favoriteVenues) {
        dispatch(_getFavoriteVenues(favoriteVenues));
      }
      if (favoriteCaterers) {
        dispatch(_getFavoriteCaterers(favoriteCaterers));
      }
    } catch (error) {
      console.error('redux/events.js getEvents error >>>>', error);
    }
  };
};

const favorites = (state = {}, action) => {
  switch (action.type) {
    case GET_FAVORITE_VENUES:
      const venues = action.venus;
      return { ...state, venues };
    case GET_FAVORITE_CATERER:
      const caterers = action.caterer;
      return { ...state, caterers };
    default:
      return state;
  }
};

export default favorites;
