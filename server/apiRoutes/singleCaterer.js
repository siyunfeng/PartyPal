const express = require('express');
const singleCatererRouter = express.Router();
const axios = require('axios');

require('dotenv').config();

const query = `{
    business(id: "2kkjzgLwKHFmLAfR86kE3Q") {
        name
        id
      alias
      phone
      price
      photos
      url     
      rating
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

const YELP_TOKEN =
  'RanbOY5NRwsj61NTbTSYC5PusHxCsBee1r0iIBdwGueYurwZ_yIlZL1PD_H5zmaz59Uv8vQAE2rEQQY_wxUbHgjeCvXxfCwNhJS0UY6gDHzP6raJhQ9wGYnWnlN9Y3Yx';

const getSingleCaterer = async () => {
  const options = {
    method: 'POST',
    url: 'https://api.yelp.com/v3/graphql',
    headers: {
      'content-type': 'application/graphql',
      Authorization: `Bearer ${YELP_TOKEN}`,
    },
    data: query,
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

singleCatererRouter.post('/', async (req, res, next) => {
  try {
    const data = await getSingleCaterer();
    res.send(data).status(200);
  } catch (error) {
    next(error);
  }
});

module.exports = { singleCatererRouter };
