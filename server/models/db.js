const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const mongodb_uri = process.env.MONGODB_ATLAS_URI;
const db_name = process.env.DB_NAME;

const dbURL = process.env.MONGODB_ATLAS_URI
  ? process.env.MONGODB_ATLAS_URI
  : 'mongodb://localhost:27017/Oura';

async function main() {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
    console.log('successfully connected to DB');
  } catch (e) {
    console.log('could not connect', e);
  }
}

main().catch((err) => console.log(err));

module.exports = mongoose;
