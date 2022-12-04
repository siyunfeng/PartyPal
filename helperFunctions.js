import moment from 'moment'

export const convert = (input) => {
  return moment(input, 'HH:mm').format('h:mm A');
};

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
