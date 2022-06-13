const express = require('express');

const app = express();
const db = require('./db/models');
const PORT = process.env.PORT || 8081;

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.error(err);
  });

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});