const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Oura is live on http://localhost:${PORT}`);
});
