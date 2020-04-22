// lib/app.ts
import express from 'express';
import helmet = require('helmet');
import chalk = require('chalk');
// import morgan from 'morgan';

// Create a new express application instance
const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(helmet());

app.listen(3000, function () {
  console.log(chalk.cyan('Example app listening on port 3000!'));
});
