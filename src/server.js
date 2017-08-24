require('dotenv').load();

const express = require('express');
const bindDev = require('./dev-server');

const app = express();

bindDev(app);

app.listen(process.env.PORT || 8080);
