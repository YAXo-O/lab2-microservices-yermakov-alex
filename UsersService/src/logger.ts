import { createLogger, format, transports } from 'winston';

// test
export const logger = createLogger({
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.simple(),
			),
			level: 'info',
		}),
		new transports.File({ filename: './logs/log.log' }),
	],
});
