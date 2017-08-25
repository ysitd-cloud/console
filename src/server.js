require('dotenv').load();

const express = require('express');
const template = require('./template');

const app = express();

template(app);

let binding;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  binding = require('./dev');
} else {
  // eslint-disable-next-line global-require
  binding = require('./prod');
}

binding(app)
  .then(() => app.listen(process.env.PORT || 8080));
