require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./security')(app);
require('./template')(app);

require('./session')(app)
  .then(require('./assets'))
  .then(require('./view'))
  .then(() => app.listen(process.env.PORT || 8080, () => console.log('Start listening')))
  .catch(console.error);
