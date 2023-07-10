import moment from 'moment-timezone';
const isBindableOpen = () => {
  let isOpen = false;
  let bindableDateTime = moment().tz('America/New_York');
  let hourNow = bindableDateTime.hour();
  let dayOfweek = bindableDateTime.day();
  const bindableOpenHours = {
    weekDays: {
      min: 8,
      max: 21,
    },
    saturday: {
      min: 10,
      max: 18,
    },
  };
  const compareHours = hours => {
    if (hourNow >= hours.min && hourNow < hours.max) {
      isOpen = true;
    }
  };
  if (dayOfweek > 0 && dayOfweek < 6) {
    compareHours(bindableOpenHours.weekDays);
  } else if (dayOfweek == 6) {
    compareHours(bindableOpenHours.saturday);
  }
  return isOpen;
};
export default isBindableOpen;
