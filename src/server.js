require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./template')(app);

require('./server/session')(app)
  .then(require('./server/assets'))
  .then(require('./server/view'))
  .then(() => app.listen(process.env.PORT || 8080, () => console.log('Start listening')))
  .catch(console.error);
