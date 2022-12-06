import axios from 'axios';

const DELETE_LIKED_VENUE_ITEM = 'DELETE_LIKED_VENUE_ITEM';
const DELETE_LIKED_CATERER_ITEM = 'DELETE_LIKED_CATERER_ITEM';

const _deleteLikedVenueItem = (deletedItem) => {
  return {
    type: DELETE_LIKED_VENUE_ITEM,
    deletedItem,
  };
};

const _deleteLikedCatererItem = (deletedItem) => {
  return {
    type: DELETE_LIKED_CATERER_ITEM,
    deletedItem,
  };
};

export const deleteVenueLikedItem = (itemToDelete) => {
  return async (dispatch) => {
    try {
      // send yelpId here Siyun and add to req.params
      const yelpId = itemToDelete.id;
      const { data } = await axios.delete(
        `/api/likedItems/deleteVenue/${yelpId}`,
        userSearchInput
      );
      // can't test how it looks so Siyun you might need to change somethings
      const deletedItem = data;
      dispatch(_deleteLikedVenueItem(deletedItem));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCatererLikedItem = (itemToDelete) => {
  return async (dispatch) => {
    try {
      // send yelpId here Siyun and add to req.params
      const yelpId = itemToDelete.id;
      const { data } = await axios.delete(
        `/api/likedItems/deleteCaterer/${yelpId}`,
        userSearchInput
      );
      // can't test how it looks so Siyun you might need to change somethings
      const deletedItem = data;
      dispatch(_deleteLikedCatererItem(deletedItem));
    } catch (error) {
      console.error(error);
    }
  };
};

const deletedItem = (state = [], action) => {
  switch (action.type) {
    case DELETE_LIKED_VENUE_ITEM:
      // edit this to show only what was not deleted
      return action.deletedItem;
    case DELETE_LIKED_CATERER_ITEM:
      // edit this to show only what was not deleted
      return action.deletedItem;
    default:
      return state;
  }
};

export default deletedItem;
