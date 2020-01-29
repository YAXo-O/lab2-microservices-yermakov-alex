import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Server as HttpServer } from 'http';

import router from '@routes/QueueRoutes';
import options from '../swagger';
import { logger } from './logger';

export interface Address {
	port: number;
	address: string;
}

export default class Server {
	private readonly app: express.Application = express();
	private server?: HttpServer = undefined;
	private readonly swagger;
	private readonly baseUrl: string = '/api/private/v1/queue';

	constructor() {
		this.swagger = require('express-swagger-generator')(this.app);
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
	}

	private applyRoutes() {
		this.app.use(this.baseUrl, router);
	}
}
