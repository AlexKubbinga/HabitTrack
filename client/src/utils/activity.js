const { getDailyActivity } = require('../apiClient');
const { getAvgByMonth } = require('./utils');

async function getScoreByMonth() {
  const data = await getDailyActivity();
  return getAvgByMonth(data, 'score');
}

getScoreByMonth();
