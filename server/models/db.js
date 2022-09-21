const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Oura');
  console.log('successfully connected to DB');
}

main().catch((err) => console.log(err));

module.exports = mongoose;
