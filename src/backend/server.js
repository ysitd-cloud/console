require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const serveStatic = require('serve-static');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic('static'));

require('./security')(app);
require('./template')(app);

require('./session')(app);
require('./assets')(app)
  .then(require('./view'))
  .then(() => app.listen(process.env.PORT || 8080, () => console.log('Start listening')))
  .catch(console.error);
