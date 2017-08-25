require('dotenv').load();

const express = require('express');
const bindDev = require('./dev');
const template = require('./template');

const app = express();
template(app);

bindDev(app);

app.listen(process.env.PORT || 8080);
