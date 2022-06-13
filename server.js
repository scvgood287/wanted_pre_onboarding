const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/models');
const healthCheck = require('./app/routes');
const postRoutes = require('./app/routes/post.routes');
const applyRoutes = require('./app/routes/apply.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/', healthCheck);
app.use('/post', postRoutes);
app.use('/apply', applyRoutes);

db.sequelize
  .sync({ force: true }) // 개발 끝나면 false
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