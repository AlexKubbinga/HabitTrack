const { DateTime } = require('luxon');

function getWeek(timestamp) {
  return DateTime.fromISO(timestamp).weekNumber;
}

export function calcHabitProgress(start_date, length) {
  const start = DateTime.fromISO(start_date);
  const today = DateTime.now();
  const result = Number(
    (
      (Math.ceil(today.diff(start, 'days').toObject().days) / length) *
      100
    ).toFixed(0)
  );
  return result;
}

export function getAvgByMonth(data, metric) {
  const monthData = {};
  const monthFinal = [];
  let daysCounter;
  let priorMonth;
  let month;
  for (const day of data) {
    month = DateTime.fromISO(day.timestamp).monthLong;

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
  for (const [month, value] of Object.entries(monthData)) {
    const temp = {};
    temp['month'] = month;
    temp['value'] = value;
    monthFinal.push(temp);
  }
  return monthFinal;
}

export function getAvgByWeek(data, metric) {
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
  return weekFinal;
}

export function sortHabits(habits) {
  // sorts by main habit and then by start date with latest start date first
  return habits.sort((a, b) => {
    return a.main_habit > b.main_habit
      ? -1
      : a.main_habit === b.main_habit
      ? new Date(a.start_date) > new Date(b.start_date)
        ? -1
        : 1
      : 1;
  });
}
