const express = require('express');
const caterersRouter = express.Router();
const axios = require('axios');

require('dotenv').config();

const userSearch = (userSearchInput, type) => {
  if (type === 'all') {
    const { location, term } = userSearchInput;
    return `{
    search(term: "restaurant ${term}", location: "${location}", categories: "catering", attributes: "Offers Catering", limit: 50) {
      total
      business {
        id
        name
        phone
        price
        photos
        url
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
  }`;
  } else {
    return `{
    business(id: "${userSearchInput}") {
        name
        id
      alias
      phone
      price
      photos
      url     
      rating
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
 
    }
  }`;
  }
};
// const yelpAPIUrl = 'https://api.yelp.com/v3/graphql';
// const client = new GraphQLClient(yelpAPIUrl, {
//   headers: {
//     'content-type': 'application/graphql',
//     Authorization: `Bearer ${process.env.YELP_TOKEN}`,
//   },
// });
const YELP_TOKEN =
  'RanbOY5NRwsj61NTbTSYC5PusHxCsBee1r0iIBdwGueYurwZ_yIlZL1PD_H5zmaz59Uv8vQAE2rEQQY_wxUbHgjeCvXxfCwNhJS0UY6gDHzP6raJhQ9wGYnWnlN9Y3Yx';
const getCaterers = async (userSearchInput, queryType) => {
  const options = {
    method: 'POST',
    url: 'https://api.yelp.com/v3/graphql',
    headers: {
      'content-type': 'application/graphql',
      Authorization: `Bearer ${YELP_TOKEN}`,
    },
    data: userSearch(userSearchInput, queryType),
  };
  return axios
    .request(options)
    .then(function (response) {
      const res = response.data;
      return res;
      // console.log(res.data.search.business); // Response received from the API
    })

    .catch(function (error) {
      console.error(error);
    });
};

caterersRouter.post('/', async (req, res, next) => {
  try {
    const queryType = 'all';
    const userSearchInput = req.body;
    const data = await getCaterers(userSearchInput, queryType);
    res.send(data).status(200);
  } catch (error) {
    next(error);
  }
});

caterersRouter.post('/:id', async (req, res, next) => {
  try {
    const queryType = 'single';
    const yelpId = req.params.id;
    const data = await getCaterers(yelpId, queryType);
    res.send(data).status(200);
  } catch (error) {
    next(error);
  }
});

// caterersRouter.post('/', async (req, res, next) => {
//   try {
//     // users will select the params
//     const term = 'restaurant mexican';
//     const location = '11209';
//     const variables = { term, location };
//     const query = `{
//         query search($term: String!, $location: String!){
//         search(
//             term: $term,
//             location: $location,
//           ) {
//            total
//            business {
//              name
//              phone
//              price
//              photos
//              url
//              reviews {
//                id
//                text
//                rating
//              }
//              location {
//                address1
//                city
//                state
//                country
//              }
//              rating
//            }
//          }
//        }}`;
//     const data = await client.request(query, variables);
//     console.log(res.json(data));
//   } catch (error) {
//     throw error;
//   }
// });

module.exports = { caterersRouter };
