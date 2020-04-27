import express from 'express';
import helmet from 'helmet';
import chalk from 'chalk';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import { Helpers } from './util/helpers';
import { IExpError } from './common.models';
import './util/db';
import './util/passport';
import routesApi from './routes/index.routes';

// const helpers = new Helpers();
const apiLogger = Helpers.apiLogger;
const logger = apiLogger.getLogger();

// Create a new express application instance
const app: express.Application = express();

// app.use(morgan('dev'));
// @ts-ignore
app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// @ts-ignore
app.use(helmet());

// Initialise Passport before using the route middleware
app.use(passport.initialize());

// Use the API routes when path starts with /api
app.use('/api', routesApi);

// Catch unauthorised errors
app.use((err: IExpError, req: express.Request, res: express.Response) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ message: err.name + ': ' + err.message });
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: IExpError, req: express.Request, res: express.Response) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: IExpError, req: express.Request, res: express.Response) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(4000, function () {
  console.log(chalk.cyan('App server listening on port 4000!'));
});
