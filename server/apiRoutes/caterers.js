const axios = require('axios');
// const { YELP_TOKEN } = process.env;

console.log('here is the yelp token =====', process.env.YELP_TOKEN);
const TOKEN = process.env.YELP_TOKEN;

require('dotenv').config();

const query = `{
    search(term: "restaurant mexican", location: "11209", categories: "catering", attributes: "Offers Catering") {
      total
      business {
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

const getCaterers = async () => {
  const options = {
    method: 'POST',
    url: 'https://api.yelp.com/v3/graphql',
    headers: {
      'content-type': 'application/graphql',
      Authorization: `Bearer ${process.env.YELP_TOKEN}`,
    },
    data: query,
  };
  axios
    .request(options)
    .then(function (response) {
      const res = response.data;
      console.log(res.data.search.business); // Response received from the API
    })

    .catch(function (error) {
      console.error(error);
    });
};

getCaterers();
