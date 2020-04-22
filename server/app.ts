import express from 'express';
import helmet from 'helmet';
import chalk from 'chalk';
import morgan from 'morgan';
import { ApiLogger } from './util/logger';
import { Helpers } from './util/helpers';

const apiLogger = new ApiLogger();
const helpers = new Helpers();
const logger = apiLogger.getLogger();

// Create a new express application instance
const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

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
  (err, req, res, next) => {
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

app.listen(3001, function () {
  console.log(chalk.cyan('App server listening on port 3000!'));
});
