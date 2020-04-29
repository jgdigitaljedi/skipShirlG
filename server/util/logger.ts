// import * as winston from 'winston';
import { createLogger, Logger, format, transports } from 'winston';
import express from 'express';
import path from 'path';
import { IUserRequest } from '../common.models';

// const level = process.env.NODE_ENV !== 'production' ? 'debug' : 'info';
const logDir = path.join(__dirname, 'logs');
const filename = path.join(logDir, 'results.log');

interface IError {
  message: string;
  status: number;
}

interface ILogger extends Logger {
  logThis?: (arg0: IError, arg1: IUserRequest | string) => void;
  logInfo?: (arg0: string) => void;
  logWarning?: (arg0: string) => void;
}

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

// instantiate a new Winston Logger with the settings defined above
const logger: ILogger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [new transports.File(options.file), new transports.Console(options.console)],
  exitOnError: false // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  // @ts-ignore
  write: (message: any) => {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};

logger.logThis = (err: IError | string, req: IUserRequest) => {
  if (typeof err === 'string') {
    logger.error(err + ' - ' + req.originalUrl + ' - ' + req.method + ' - ' + req.ip);
  } else {
    logger.error(
      (err && err.status ?err.status.toString() : '') ||
        500 + ' -  ' + (err && err.message ? err.message : '') + ' - ' + req.originalUrl + ' - ' + req.method + ' - ' + req.ip
    );
  }
};

logger.logInfo = (operation) => {
  logger.info(operation);
};

logger.logWarning = (warning) => {
  logger.warn(warning);
};

export default logger;

/*
logger.log('silly', "127.0.0.1 - there's no place like home");
logger.log('debug', "127.0.0.1 - there's no place like home");
logger.log('verbose', "127.0.0.1 - there's no place like home");
logger.log('info', "127.0.0.1 - there's no place like home");
logger.log('warn', "127.0.0.1 - there's no place like home");
logger.log('error', "127.0.0.1 - there's no place like home");
logger.info("127.0.0.1 - there's no place like home");
logger.warn("127.0.0.1 - there's no place like home");
logger.error("127.0.0.1 - there's no place like home");
*/
