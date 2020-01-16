import { logger } from './logger';
import Server, { Address } from './server';

const port: number = +process.env.PORT || 8080;

const server = new Server();
server.serve(port)
  .then((address: Address) => {
		logger.info(`Session service has been launched at ${address.address}:${address.port}`);
	})
  .catch((error: string) => {
		logger.error(error);
	});
