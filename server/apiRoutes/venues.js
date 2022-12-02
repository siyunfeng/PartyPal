const venuesRouter = require('express').Router();

const axios = require('axios');

let TOKEN =
  'OfKrzkAMS0PZWEzC94IyenIjNfGwzbCIhqoFWHp45icVQmoRaZ7FJ9MoIgvzTwXWVHzhy_LATrP9lmlYv61ZA65r2a13aXrQsxK8t1pzoLOSsmRmsTd8PDioSk-KY3Yx';

require('dotenv').config();

// const TOKEN = process.env.IRAIS_YELP_TOKEN

const userSearch = (queryType, userSearchInput) => {
  console.log('QUERY TYPE', queryType);
  console.log('USERRRRRRR', typeof userSearchInput);
  if (queryType === 'all') {
    console.log('IN HERE');
    return `{
      search(term: "${userSearchInput.service}", location: "${userSearchInput.location}", categories: "venues", limit: 50) {
        total
        business {
          id
          alias
          name
          phone
          price
          photos
          url
          hours {
            open {
              is_overnight
              end
              start
              day
            }
          }
          reviews {
            id
            text
            rating
          }
          location {
            address1
            city
            state
            country
          }
          rating
        }
      }
    }
    `;
  } else {
    return `{
      business(id: "${userSearchInput}") {
        id
        alias
        name
        phone
        price
        photos
        url
        hours {
          open {
            is_overnight
            end
            start
            day
          }
        }
        reviews {
          id
          text
          rating
        }
        location {
          address1
          city
          state
          country
        }
        rating
      }
    }
     `;
  }
};

// g6QOBY2bmEw5CKfiZ43egQ
const getVenues = async (queryType, userSearchInput) => {
  console.log('SHOULD BE YELP ID', typeof userSearchInput);
  console.log('QUERY TYPE', queryType);
  const options = {
    method: 'POST',
    url: 'https://api.yelp.com/v3/graphql',
    headers: {
      'content-type': 'application/graphql',
      Authorization: `Bearer ${TOKEN}`,
    },
    data: userSearch(queryType, userSearchInput),
  };
  return axios
    .request(options)
    .then(function (response) {
      const res = response.data;
      return res;
    })

    .catch(function (error) {
      console.error(error);
    });
};

venuesRouter.post('/', async (req, res, next) => {
  try {
    const queryType = 'all';
    const userSearchInput = req.body;
    console.log('userSearcInout', userSearchInput);
    const data = await getVenues(queryType, userSearchInput);
    res.send(data).status(200);
  } catch (error) {
    next(error);
  }
});

venuesRouter.post('/:id', async (req, res, next) => {
  // get yelp id from frontend and use singleVenueQuery
  try {
    console.log('REQ', req.body.id);
    const yelpId = req.body.id;

    // console.log('IN POST', typeof yelpId);
    console.log('IN POST', yelpId);
    const queryType = 'single';
    const data = await getVenues(queryType, yelpId);
    res.send(data).status(200);
  } catch (error) {
    next(error);
  }
});

module.exports = venuesRouter;
