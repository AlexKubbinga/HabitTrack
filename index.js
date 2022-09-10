require('dotenv').config('./.env');
const { DateTime } = require('luxon');

const PAT = 'N7XEZ52OBLWB4VEOHLLCWJW3JNQ3W7PX';
console.log('here,', PAT);

var myHeaders = new Headers();

myHeaders.append('Authorization', `Bearer ${PAT}`);
myHeaders.get('Authorization');
console.log(myHeaders.get('Authorization'));

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

// fetch(
//   'https://api.ouraring.com/v2/usercollection/personal_info?start_date=2021-11-01&end_date=2021-12-01',
//   requestOptions
// )
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log('error', error));

// YYYY-MM-DD
// console.log(new Date().toISOString().substring(0, 10));
const start_date = '2022-01-01';
const end_date = '2022-09-01';
const v1 = `https://api.ouraring.com/v1/activity?start=${start_date}&end=${end_date}`;
const v2 = `https://api.ouraring.com/v2/usercollection/daily_activity?start_date=${start_date}&end_date=${end_date}`;
//v1 is inclusive of end-date, v2 is not inclusive of end-date

function getDailyActivity(version) {
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(version, requestOptions)
    .then((response) => response.text())
    .catch((error) => console.log('error', error));
}

const db = [];
const main = async () => {
  console.log('---------------------------V2-------------------');
  const dailyActivity2 = await getDailyActivity(v2);
  // console.log(JSON.parse(dailyActivity2));
  console.log('success');
  const augData = JSON.parse(dailyActivity2).data;
  // for (let i = 0; i < augData.length; i++) {
  //   const day = augData[i];
  //   db.push(day);
  // }
  // getAvgScoreByWeek();
  getAvgByWeek(augData, 'score');
};

function getAvgByMonth(data, metric) {
  const monthData = {};
  let daysCounter;
  let priorMonth;
  let month;
  for (const day of data) {
    month = DateTime.fromISO(day.timestamp).monthLong;
    // console.log(`${day.timestamp} + week: ${month} + metric ${day[metric]}`);
    if (!monthData[month]) {
      monthData[month] = day[metric];
      if (monthData[priorMonth]) {
        monthData[priorMonth] = monthData[priorMonth] / daysCounter;
      }
      priorMonth = month;
      daysCounter = 1;
    } else {
      monthData[month] += day[metric];
      daysCounter += 1;
    }
  }
  monthData[month] = monthData[month] / daysCounter;
  const final = [];
  for (const [month, value] of Object.entries(monthData)) {
    const temp = {};
    temp['month'] = month;
    temp['value'] = value;
    final.push(temp);
  }
  console.log(final);
  return final;
}

function getAvgByWeek(data, metric) {
  //store in object with week as key and value as score
  // To find the average by week one needs to:
  // identify the week of the given OuraDataObject
  // add all weeks together and divide by number of days in week
  // NB: users can not wear ring for one day and thus number of days can be less than 7
  // therefore use a counter and prior week variable to determine correct average
  // a prior week is needed as user may not wear ring for a week
  const weekData = {};
  const weekFinal = [];
  let daysCounter;
  let priorWeek;
  let week;
  for (const day of data) {
    week = getWeek(day.timestamp);
    console.log(`${day.timestamp} + week: ${week} + metric ${day[metric]}`);
    if (!weekData[week]) {
      //if metric is actually 0 it will skip it (ex:active calories was 0 one day)
      weekData[week] = day[metric];
      if (weekData[priorWeek]) {
        weekData[priorWeek] = weekData[priorWeek] / daysCounter;
      }
      priorWeek = week;
      daysCounter = 1;
    } else {
      weekData[week] += day[metric];
      daysCounter += 1;
    }
  }
  // fix for last value
  weekData[week] = weekData[week] / daysCounter;
  for (const [week, value] of Object.entries(weekData)) {
    const temp = {};
    temp['weekNumber'] = week;
    temp['value'] = value;
    weekFinal.push(temp);
  }
  console.log(weekFinal);
  return weekFinal;
}

function getWeek(timestamp) {
  const dt = DateTime.fromISO(timestamp);
  // console.log(dt.weekNumber);
  return dt.weekNumber;
}

// getWeek();

main();

// console.log(DateTime.fromISO('2022-08-21T04:00:00+01:00').weekNumber);

module.exports = db;
