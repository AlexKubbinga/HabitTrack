const { getAvgByMonth } = require('./utils/utils');

const rootUrl = 'http://localhost:3001';

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

export function getPersonalInfo() {
  return fetch(`${rootUrl}/personal_info`)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
}

export function getDailyActivity() {
  // by default end_date is current date therefore only need start
  return fetch(`${rootUrl}/activity`)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
}

export async function getScoreByMonth() {
  const data = await getDailyActivity();
  const final = getAvgByMonth(data.data, 'score');
  console.log('final', final);
  return final;
}
