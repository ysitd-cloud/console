const helmet = require('helmet');
const { IS_PRODUCTION } = require('./config');

module.exports = (app) => {
  if (IS_PRODUCTION) {
    app.disable('x-powered-by');
  }

  app.use(helmet.noSniff());
  app.use(helmet.frameguard({ action: 'deny' }));
};
