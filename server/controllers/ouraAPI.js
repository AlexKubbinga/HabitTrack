const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const PAT = process.env.PAT; // multiple users could pull key from DB

var myHeaders = new Headers();
myHeaders.append('Authorization', `Bearer ${PAT}`);
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

const { getAverage } = require('../utils/averages');

const Habit = require('../models/habit');

const rootUrl = 'https://api.ouraring.com/v2/usercollection/';

// TODO
// should we move formatting from API data to usable to the server side?

const getDailyActivity = async (req, res) => {
  try {
    console.log('getting activity');
    const body = await fetch(
      `${rootUrl}daily_activity?start_date=2022-01-01`,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log('error', error)); // error handling for updating app etc
    console.log('here', body);
    res.status = 200;
    res.send(body);
  } catch (error) {
    res.status = 500;
    console.log('There is an error in getting: ', error);
  }
};

const getAverages = async (req, res) => {
  // this will get averages of sleep, readiness and acitvity for the past month
  try {
    let base_start_date = new Date();
    base_start_date.setDate(base_start_date.getDate() + Number(-30));
    base_start_date = base_start_date.toISOString().slice(0, 10);

    let calls = ['daily_activity', 'daily_sleep', 'daily_readiness'];

    const activity = await fetch(
      `${rootUrl}daily_activity?start_date=${base_start_date}`,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log('error', error)); // error handling for updating app etc

    const sleep = await fetch(
      `${rootUrl}daily_sleep?start_date=${base_start_date}`,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log('error', error));

    const readiness = await fetch(
      `${rootUrl}daily_readiness?start_date=${base_start_date}`,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log('error', error));

    const activity_avg = getAverage(activity).toFixed(0);
    const sleep_avg = getAverage(sleep).toFixed(0);
    const readiness_avg = getAverage(readiness).toFixed(0);

    res.status = 200;
    res.send([
      { name: 'Activity', avg: activity_avg },
      { name: 'Sleep', avg: sleep_avg },
      { name: 'Readiness', avg: readiness_avg },
    ]);
  } catch (error) {
    res.status = 500;
    console.log('There is an error in getting: ', error);
  }
};

//TODO refactor so that there are functions to get endpoints in oura Models
const getHabitData = async (req, res) => {
  // receive metric and start_date of habit
  const { habit_name } = req.query;
  const habit = await Habit.findOne({ name: habit_name });
  // console.log(habit);
  let habitData; // habit data from oura
  let baseline; // avg of past 3 months from oura
  let code;
  const daily_metric =
    habit.area_of_improvement === 'Sleep' ? 'daily_sleep' : 'daily_activity';

  // baseline is calculated using 3 months of data prior to Habit Start.
  let base_start_date = new Date(habit.start_date);
  base_start_date.setDate(base_start_date.getDate() + Number(-90));
  base_start_date = base_start_date.toISOString().slice(0, 10);

  // if habit start is in future then wont work
  // send relevant message back to front end so can tell user this.
  // if (new Date(habit.start_date) > new Date(Date.now())) {
  //   habit.start_date = new Date(Date.now()).toISOString().slice(0, 10);
  // }

  // fetch API data
  baseline = await fetch(
    `${rootUrl}${daily_metric}?start_date=${base_start_date}&end_date=${habit.start_date}`,
    requestOptions
  ).then((response) => {
    code = response.status;
    return response.json();
  });

  const scoreAvg = getAverage(baseline);

  const baseline_array = new Array(habit.length).fill(scoreAvg);
  // console.log(baseline_array);

  // will fetch too much data if end_date is before today
  //TODO
  habitData = await fetch(
    `${rootUrl}${daily_metric}?start_date=${habit.start_date}`,
    requestOptions
  )
    .then((response) => {
      code = response.status;
      return response.json();
    })
    .catch((error) => console.log('error', error));

  // console.log('response code from API', code);
  // console.log(habitData);

  habitData = habitData.data.map((day) => day.score);
  // console.log(habitData);

  const dataArray = [];
  for (let i = 0; i < habit.length; i++) {
    const temp = {};
    temp['y-axis'] = habit.dates[i];
    temp['baseline'] = baseline_array[i];
    temp['habit'] = habitData[i];
    dataArray.push(temp);
  }
  console.log(dataArray);
  res.status(200).send(dataArray);
};

const getPersonalInfo = async (req, res) => {
  try {
    const body = await fetch(`${rootUrl}personal_info`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error)); // error handling for updating app etc
    res.status = 200;
    res.send(body);
  } catch (error) {
    res.status = 500;
    console.log('There is an error in getting: ', error);
  }
};

module.exports = {
  getDailyActivity,
  getPersonalInfo,
  getHabitData,
  getAverages,
};
