const { getAvgByMonth } = require('./utils/utils');

const rootUrl = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'http://localhost:3001';

export function createHabit(habit) {
  return fetch(`${rootUrl}/habit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(habit),
  })
    .then((res) => res.json())
    .catch((err) => console.log('error', err));
}

export function getHabits() {
  return fetch(`${rootUrl}/habit`)
    .then((res) => res.json())
    .catch((err) => console.log('error', err));
}

export function getAverages() {
  return fetch(`${rootUrl}/averages`)
    .then((res) => res.json())
    .catch((err) => console.log('error', err));
}

export function getPersonalInfo() {
  return fetch(`${rootUrl}/personal_info`)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
}

export function getDailyActivity() {
  return fetch(`${rootUrl}/activity`)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
}

export function getMainHabit() {
  return fetch(`${rootUrl}/mainHabit`)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
}

export function getCurrentHabitChartData(habitName) {
  const params = new URLSearchParams({
    habit_name: habitName,
  });
  const query = params.toString();
  return fetch(`${rootUrl}/currentHabit?${query}`)
    .then((res) => res.json())
    .catch((err) => console.log('error', err));
}

export function validateHabit(habitName) {
  const params = new URLSearchParams({
    habit_name: habitName,
  });
  const query = params.toString();
  return fetch(`${rootUrl}/validateHabit?${query}`)
    .then((res) => res.json())
    .catch((err) => console.log('error', err));
}

export async function getScoreByMonth() {
  const data = await getDailyActivity();
  const final = getAvgByMonth(data.data, 'score');
  console.log('final', final);
  return final;
}

export function updateMainHabit(oldMain, newMain) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ oldMain, newMain }),
  };
  return fetch(`${rootUrl}/mainHabit`, requestOptions)
    .then((res) => console.log('updating habit', res))
    .catch((err) => console.log('error', err));
}

export function deleteHabit(habitName) {
  const requestOptions = {
    method: 'DELETE',
  };
  const params = new URLSearchParams({
    habit_name: habitName,
  });
  const query = params.toString();
  return fetch(`${rootUrl}/deleteHabit?${query}`, requestOptions)
    .then((res) => res.json())
    .catch((err) => console.log('error', err));
}

export function oAuthRequest() {
  return fetch(`${rootUrl}/auth`)
    .then((res) => res.json())
    .then((res) => console.log(res));
}
