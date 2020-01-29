import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Server as HttpServer } from 'http';

// Routers
import consumerRouter from '@routes/ConsumerRoutes';
import consumptionRouter from '@routes/ConsumptionRoutes';
import eventRouter from '@routes/EventRoutes';
import sessionRouter from '@routes/SessionRoutes';
import userRouter from '@routes/UserRoutes';

import options from '../swagger';
import { logger } from './logger';

export interface Address {
	port: number;
	address: string;
}

export default class Server {
	private readonly app: express.Application = express();
	private server?: HttpServer = undefined;
	private readonly swagger = require('express-swagger-generator')(this.app);
	private readonly baseUrl: string = '/api/v1';

	constructor() {
		logger.info('Creating server instance');
		this.applyMiddleware();
		logger.info('Server has applied middleware.');
		this.applyRoutes();
		logger.info('Server has applied routes.');
	}

	public serve(port: number): Promise<Address> {
		logger.info('Server starts to serve.');
		return new Promise<Address>((resolve, reject) => {
			logger.info('Setting up swagger documentation');
			this.swagger({
				...options,
				swaggerDefinition: {
					basePath: this.baseUrl,
					host: `localhost:${port}`,
				},
			});
			logger.info('Starting server');
			this.server = this.app
				.on('error', () => {
					reject(new Error('Unable to launch server!'));
				})
				.listen(port, () => {
					resolve(this.server.address());
			});
		});
	}

	private applyMiddleware() {
		this.app.use(bodyParser.json());
		this.app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', 'http://localhost:8082');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
			res.header('Access-Control-Allow-Headers', 'Content-Type');
			res.header('Access-Control-Allow-Credentials', 'true');

			next();
		});
	}

	private applyRoutes() {
		this.app.use(`${this.baseUrl}/consumer`, consumerRouter);
		this.app.use(`${this.baseUrl}/consumption`, consumptionRouter);
		this.app.use(`${this.baseUrl}/event`, eventRouter);
		this.app.use(`${this.baseUrl}/user`, userRouter);
		this.app.use(`${this.baseUrl}/session`, sessionRouter);
	}
}
