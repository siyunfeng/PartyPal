const axios = require('axios');
const moment = require('moment');

// for converting end and start hours for a venue from military time to regular human time 
const convert = (input) => {
  return moment(input, 'HH:mm:ss').format('h:mm:ss A');
}

// for finding day of the week since yelp uses numbers (e.g Monday = 0, Sunday = 6)
const dayOfWeek = {
  0: 'Monday', 
  1: 'Tuesday', 
  2: 'Wednesday', 
  3: 'Thursday', 
  4: 'Friday', 
  5: 'Saturday', 
  6: 'Sunday'
}

const findDayOfWeek = (num) => {
  return dayOfWeek[num]
}

//will store in process.env once we figure it out
const TOKEN =
  '_2xNYMdiNkK47vAXUI6TX4TZEvGdmVjME5dVO-YoXSJgd2N31SfwR0hXUE-Lp5SY6-New20UEpRJdBDgbl3kcD_3cS5q6Rh7xAPajw5lUSiSYKZcqsTSSC0GR2Z-Y3Yx';

const query = `{
    search(term: "venue", location: "11209", categories: "venues", price: "2") {
      total
      business {
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

const getVenues = async () => {
  const options = {
    method: 'POST',
    url: 'https://api.yelp.com/v3/graphql',
    headers: {
      'content-type': 'application/graphql',
      Authorization: `Bearer ${TOKEN}`,
    },
    data: query,
  };
  axios
    .request(options)
    .then(function (response) {
      const res = response.data;
    })

    .catch(function (error) {
      console.error(error);
    });
};

getVenues();
