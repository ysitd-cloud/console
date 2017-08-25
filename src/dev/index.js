const view = require('./view');
const webpack = require('./webpack');

module.exports = function bindDev(app) {
  return webpack(app)
    .then(view);
};
