const PAT = 'N7XEZ52OBLWB4VEOHLLCWJW3JNQ3W7PX'; // multiple users could pull key from DB
var myHeaders = new Headers();
myHeaders.append('Authorization', `Bearer ${PAT}`);
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};
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
    res.status = 200;
    res.send(body);
  } catch (error) {
    res.status = 500;
    console.log('There is an error in getting: ', error);
  }
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

module.exports = { getDailyActivity, getPersonalInfo };
