import { validate } from '@decorators/index';
import { Response } from 'express';
import BaseRequest from '../interfaces/BaseRequest';
import CreateParams from '../interfaces/ConsumerParams/CreateParams';
import DeleteParams from '../interfaces/ConsumerParams/DeleteParams';
import GetParams from '../interfaces/ConsumerParams/GetParams';
import UpdateParams from '../interfaces/ConsumerParams/UpdateParams';
import { logger } from '../logger';
import ConsumerService from '../services/ConsumerService';
import PrivateTokenService from '../services/PrivateTokenService';

export default class ConsumerController {
	@validate
	public static async create(request: BaseRequest<CreateParams>, response: Response) {
		const body = request.body;

		try {
			const event = await ConsumerService.CreateConsumer(body.sessionId, body.firstName, body.lastName);

			response.status(201).json(event);
		} catch (e) {
			logger.info('Error: ', e);

			if (e.code && e.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.consumerToken = (await ConsumerService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await ConsumerController.create(request, response);
				} catch (tokenError) {
					response.status(500).json(tokenError);
				}
			} else {
				response.status(500).json(e);
			}
		}
	}

	@validate
	public static async get(request: BaseRequest<{}, GetParams>, response: Response) {
		const query = request.query;

		try {
			const result = await ConsumerService.GetConsumer(query.id, query.page, query.sessionId);

			response.status(200).json(result);
		} catch (e) {
			logger.info('Error: ', e);

			if (e.code && e.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.consumerToken = (await ConsumerService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await ConsumerController.get(request, response);
				} catch (tokenError) {
					response.status(500).json(tokenError);
				}
			} else {
				response.status(500).json(e);
			}
		}
	}

	@validate
	public static async update(request: BaseRequest<UpdateParams>, response: Response) {
		const body = request.body;

		try {
			await ConsumerService.UpdateConsumer(body.id, body.firstName, body.lastName);

			response.status(200).send();
		} catch (e) {
			logger.info('Error: ', e);

			if (e.code && e.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.consumerToken = (await ConsumerService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await ConsumerController.update(request, response);
				} catch (tokenError) {
					response.status(500).json(tokenError);
				}
			} else {
				response.status(500).json(e);
			}
		}
	}

	@validate
	public static async delete(request: BaseRequest<{}, DeleteParams>, response: Response) {
		const query = request.query;

		try {
			await ConsumerService.DeleteConsumer(query.id);

			response.status(200).send();
		} catch (e) {
			logger.info('Error: ', e);

			if (e.code && e.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.consumerToken = (await ConsumerService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await ConsumerController.delete(request, response);
				} catch (tokenError) {
					response.status(500).json(tokenError);
				}
			} else {
				response.status(500).json(e);
			}
		}
	}
}
