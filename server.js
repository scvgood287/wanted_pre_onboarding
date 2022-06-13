const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/models');
const healthCheck = require('./app/routes');
const post = require('./app/routes/post.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/', healthCheck);
app.use('/post', post);

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.error(err);
  });

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});