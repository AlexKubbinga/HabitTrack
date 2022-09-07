require('dotenv').config('./.env');

const PAT = process.env.PAT;
//

var myHeaders = new Headers();

myHeaders.append('Authorization', `Bearer ${PAT}`);
myHeaders.get('Authorization');
console.log(myHeaders.get('Authorization'));

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

fetch(
  'https://api.ouraring.com/v2/usercollection/personal_info?start_date=2021-11-01&end_date=2021-12-01',
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
