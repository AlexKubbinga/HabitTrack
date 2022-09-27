const dt = require('luxon');
const DateTime = dt.DateTime;
/*
Purpose: create array of dates in format
 where each date matches Oura API day field

Input:
- start_date: string of date in format (2022-08-28)
- length: integer >0
Output: dateArray: ["2022-08-28" ... "2022-09-28"] of length equal to length param
*/
function getEndDate(start_date, length) {
  const start = new Date(start_date);
  let end = new Date(start_date);
  end.setDate(end.getDate() + Number(length - 1));
  return end.toISOString().slice(0, 10);
}

function createDateArray(start_date, length) {
  // create end date that is length away
  const start = new Date(start_date);
  let end = new Date(start_date);
  end.setDate(end.getDate() + Number(length - 1));

  // create array
  let dateArray = [];
  let currentDate = start;
  while (currentDate <= end) {
    let dateString = currentDate.toISOString().slice(0, 10);
    dateArray.push(dateString);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray; // ["2022-08-28" ... "2022-09-28"]
}

today = new Date(new Date().toISOString().slice(0, 10));

console.log(DateTime.fromISO('2016-05-25').toLocaleString(DateTime.DATE_FULL));
DateTime.fromISO('2016-05-25').toLocaleString(DateTime.DATE_FULL);

module.exports = { createDateArray, getEndDate };
