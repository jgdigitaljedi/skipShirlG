import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import chalk from 'chalk';
import morgan from 'morgan';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import { ApiLogger } from './util/logger';
import { Helpers } from './util/helpers';

/* make sure to have the following in bashrc or zshrc
 *  AUTH0_CLIENT_ID=YOUR_ID
 *  AUTH0_DOMAIN=YOUR_DOMAIN
 *  AUTH0_CLIENT_SECRET=YOUR_SECRET
 **/

const apiLogger = new ApiLogger();
const helpers = new Helpers();
const logger = apiLogger.getLogger();

// Create a new express application instance
const app: express.Application = express();

// config express-session
const sess = {
  secret: 'CHANGE THIS TO A RANDOM SECRET',
  cookie: { secure: false },
  resave: false,
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  // app.set('trust proxy', 1);
}

app.use(session(sess));

console.log('process.env.AUTH0_DOMAIN', process.env.AUTH0_DOMAIN);

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  // @ts-ignore
  helmet(),
  morgan('dev', {
    skip: function (req, res) {
      const error = res.statusCode < 400;
      if (error && res.statusCode >= 300) {
        logger.info(
          `code: ${res.statusCode} | message: ${res.statusMessage} | client: ${
            req.headers['user-agent']
          } | body: ${req.body && req.body.query ? helpers.jsonToString(req.body.query) : ''}`
        );
      }
      return error;
    },
    stream: process.stderr
  }),
  morgan('dev', {
    skip: function (req, res) {
      const error = res.statusCode >= 400;
      if (error) {
        logger.error(
          `code: ${res.statusCode} | message: ${res.statusMessage} | client: ${
            req.headers['user-agent']
          } | body: ${req.body && req.body.query ? helpers.jsonToString(req.body.query) : ''}`
        );
      }
      return error;
    },
    stream: process.stdout
  }),
  (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err) {
      try {
        switch (err.name) {
          case 'UnauthorizedError':
            logger.info(`Unauthorized request: ${err.name}`);
            res.status(err.status).json({
              error: err.message,
              message: 'Invalid token! You must be logged in to do that!'
            });
            break;
          default:
            logger.error(`Server error: ${err.name}`);
            res.status(err.status).json({ error: err.message, message: err.name });
            break;
        }
      } catch (error) {
        logger.error(`Server error: ${error}`);
        res.status(500).json({ error, message: 'Server error. Something went wrong!' });
      }
    }
  }
);

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.listen(4000, function () {
  console.log(chalk.cyan('App server listening on port 4000!'));
});
