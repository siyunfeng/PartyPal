const venuesRouter = require('express').Router();

const axios = require('axios');

let TOKEN =
  '_2xNYMdiNkK47vAXUI6TX4TZEvGdmVjME5dVO-YoXSJgd2N31SfwR0hXUE-Lp5SY6-New20UEpRJdBDgbl3kcD_3cS5q6Rh7xAPajw5lUSiSYKZcqsTSSC0GR2Z-Y3Yx';

require('dotenv').config();

// const TOKEN = process.env.IRAIS_YELP_TOKEN

const userSearch = (location, service, queryType) => {
  if (queryType === 'all') {
    return `{
      search(term: "${service}", location: "${location}", categories: "venues",) {
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
    ` {
        business(id: "g6QOBY2bmEw5CKfiZ43egQ") {
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
    
    }`;
  }
};


const getVenues = async (queryType, location, service) => {
  console.log('TOKEN', TOKEN);
  const options = {
    method: 'POST',
    url: 'https://api.yelp.com/v3/graphql',
    headers: {
      'content-type': 'application/graphql',
      Authorization: `Bearer ${TOKEN}`,
    },
    data: userSearch(location, service, queryType),
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
    const { location, service } = req.body;
    const queryType = 'all';
    const data = await getVenues(queryType, location, service);
    res.send(data).status(200);
  } catch (error) {
    next(error);
  }
});

venuesRouter.post('/:id', async (req, res, next) => {
  // get yelp id from frontend and use singleVenueQuery
  try {
    const queryType = 'single';
    const data = await getVenues(queryType);
    res.send(data).status(200);
  } catch (error) {
    next(error);
  }
});

module.exports = venuesRouter;
