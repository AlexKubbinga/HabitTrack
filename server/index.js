const express = require('express');
const cors = require('cors');
const router = require('./router');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Oura is live on http://localhost:${PORT}`);
});
