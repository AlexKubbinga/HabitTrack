const { access } = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const getAccessCode = async (req, res) => {
  try {
    let code = req.query.code;
    let error = req.query.error;
    if (error) {
      console.error(error);
      return error;
    }

    const response = await fetch('https://cloud.ouraring.com/oauth/token', {
      body: `code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2FouraCallback`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    let output = await response.json();
    let { access_token, token_type, expires_in, refresh_token } = output;
    console.log(output);
  } catch (e) {
    console.log(e);
  }
};

// TODO callback for access_code
const handleCallback = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    res.status = 500;
    console.log('There is an error in getting: ', error);
  }
};

const oAuthRequest = async (req, res) => {
  try {
    const ouraAuth = await fetch(
      `https://cloud.ouraring.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fcallback&state=alex`
    );
    res.status(200).send({ success: 'success' });
  } catch (error) {
    res.status = 500;
    console.log('There is an error in getting: ', error);
  }
};

module.exports = { handleCallback, oAuthRequest, getAccessCode };
