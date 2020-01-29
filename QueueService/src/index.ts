import 'reflect-metadata';
import { logger } from './logger';
import Server, { Address } from './server';

const port: number = +process.env.PORT || 8005;

const server = new Server();

server.serve(port)
  .then((address: Address) => {
		logger.info(`Queue service has been launched at ${address.address}:${address.port}`);
	})
  .catch((error: string) => {
		logger.error(error);
	});
