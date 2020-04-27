import mongoose from 'mongoose';
import chalk from 'chalk';
import { ApiLogger } from './logger';
import '../models/user.model';

const apiLogger = new ApiLogger();
const logger = apiLogger.getLogger();
let gracefulShutdown;
let dbURI = 'mongodb://localhost:27017/skipg';
if (process.env.NODE_ENV === 'production') {
	dbURI = process.env.SKIPG_URI;
}

mongoose.connect(dbURI, { useNewUrlParser: true });

// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
	console.log(chalk.green('Mongoose connected to ' + dbURI));
});
mongoose.connection.on('error', (err) => {
	logger.write(err, 'on mongoose connect');
	console.log(chalk.red('Mongoose connection error: ' + err));
});
mongoose.connection.on('disconnected', () => {
	console.log(chalk.yellow('Mongoose disconnected'));
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = (msg, callback) => {
	mongoose.connection.close(() => {
		console.log(chalk.yellow('Mongoose disconnected through ' + msg));
		callback();
	});
};
// For nodemon restarts
process.once('SIGUSR2', () => {
	gracefulShutdown('nodemon restart', () => {
		process.kill(process.pid, 'SIGUSR2');
	});
});
// For app termination
process.on('SIGINT', () => {
	gracefulShutdown('app termination', () => {
		process.exit(0);
	});
});
// For Heroku app termination
process.on('SIGTERM', () => {
	gracefulShutdown('Alternate app termination', () => {
		process.exit(0);
	});
});
