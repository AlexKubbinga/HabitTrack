const { getAvgByMonth } = require('./utils/utils');

const rootUrl = 'http://localhost:3001';

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
