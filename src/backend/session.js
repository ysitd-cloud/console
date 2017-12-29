const { Router } = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const axios = require('axios');
const passport = require('passport');
const { OAuth2Strategy } = require('passport-oauth');

const { OAUTH_HOST } = process.env;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const strategy = new OAuth2Strategy({
  authorizationURL: `${OAUTH_HOST}${process.env.OAUTH_AUTHORIZE_URL}`,
  tokenURL: `${OAUTH_HOST}${process.env.OAUTH_TOKEN_URL}`,
  clientID: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  callbackURL: process.env.OAUTH_CALLBACK_URL,
}, (accessToken, refreshToken, params, profile, cb) => {
  axios.get(`${OAUTH_HOST}/api/v1/user/info`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Fail to get user info');
      } else {
        cb(null, {
          provider: 'ycloud',
          id: response.data.username,
          displayName: response.data.display_name,
          emails: [
            { value: response.data.email },
          ],
          photos: [
            { value: response.data.avatar_url },
          ],
          oauth: {
            accessToken,
            refreshToken,
          },
        });
      }
    })
    .catch(cb);
});

passport.use('ycloud', strategy);

function loginGuard(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login');
    res.end();
  } else {
    next();
  }
}

function createAuthRouter() {
  const router = Router();
  router.get('/ycloud', passport.authenticate('ycloud'));
  router.get('/ycloud/callback', passport.authenticate('ycloud', {
    failureRedirect: '/auth/login?error=fail&provider=ycloud',
  }), (req, res) => {
    res.redirect('/');
  });
  router.get('/login', (req, res) => {
    res.redirect('/auth/ycloud');
  });
  return router;
}

module.exports = app => new Promise((resolve) => {
  app.use(session({
    store: new RedisStore({
      host: process.env.REDIS_HOST || 'localhost',
      db: parseInt(process.env.REDIS_DB, 10),
    }),
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/auth', createAuthRouter());

  app.use(loginGuard);

  app.post('/auth/token', (req, res, next) => {
    // eslint-disable-next-line no-underscore-dangle
    const oauth2Client = strategy._oauth2;
    const token = 'refreshToken' in req.session ? req.session.refreshToken : req.user.oauth.refreshToken;
    oauth2Client.getOAuthAccessToken(token, {
      grant_type: 'refresh_token',
    }, (err, accessToken, refreshToken) => {
      if (err) {
        next(err);
      } else {
        req.session.refreshToken = refreshToken;
        res.json({
          token: accessToken,
        });
        res.end();
      }
    });
  });

  resolve(app);
});
