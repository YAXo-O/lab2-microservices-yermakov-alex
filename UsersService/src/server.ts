import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Server as HttpServer } from 'http';

import notesRouter from '@routes/UserRoutes';

export interface Address {
	port: number;
	address: string;
}

export default class Server {
	private app: express.Application = express();
	private server?: HttpServer = undefined;

	constructor() {
		this.applyMiddleware();
		this.applyRoutes();
	}

	public serve(port: number): Promise<Address> {
		return new Promise<Address>((resolve, reject) => {
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
		this.app.use('/api', notesRouter);
	}
}
