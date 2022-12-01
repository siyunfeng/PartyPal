// const moment = require('moment');
import moment from 'moment'

// for converting end and start hours for a venue from military time to regular human time
export const convert = (input) => {
  return moment(input, 'HH:mm').format('h:mm A');
};

// for finding day of the week since yelp uses numbers (e.g Monday = 0, Sunday = 6)
const dayOfWeek = {
  0: 'Monday',
  1: 'Tuesday',
  2: 'Wednesday',
  3: 'Thursday',
  4: 'Friday',
  5: 'Saturday',
  6: 'Sunday',
};

export const findDayOfWeek = (num) => {
  return dayOfWeek[num];
};
