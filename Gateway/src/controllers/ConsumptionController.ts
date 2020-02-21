import { validate } from '@decorators/index';
import { Response } from 'express';
import BaseRequest from '../interfaces/BaseRequest';
import CreateParams from '../interfaces/ConsumptionParams/CreateParams';
import DeleteParams from '../interfaces/ConsumptionParams/DeleteParams';
import GetParams from '../interfaces/ConsumptionParams/GetParams';
import UpdateParams from '../interfaces/ConsumptionParams/UpdateParams';
import { logger } from '../logger';
import ConsumerService from '../services/ConsumerService';
import ConsumptionService from '../services/ConsumptionService';
import PrivateTokenService from '../services/PrivateTokenService';

export default class ConsumptionController {
	@validate
	public static async create(request: BaseRequest<CreateParams>, response: Response) {
		const body = request.body;

		try {
			const consumption = await ConsumptionService.CreateConsumption(
				body.consumerId, body.cost, body.description, body.eventId);

			response.status(201).json(consumption);
		} catch (e) {
			logger.info('Error: ', e);

			if (e.code && e.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.consumptionToken = (await ConsumptionService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await ConsumptionController.create(request, response);
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
			const result = await ConsumptionService.GetConsumption(query.id, query.page, query.eventId);

			response.status(200).json(result);
		} catch (e) {
			logger.info('Error: ', e);

			if (e.code && e.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.consumptionToken = (await ConsumptionService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await ConsumptionController.get(request, response);
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
			await ConsumptionService.UpdateConsumption(body.id, body.consumerId, body.cost, body.description, body.eventId);

			response.status(200).send();
		} catch (e) {
			logger.info('Error: ', e);

			if (e.code && e.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.consumptionToken = (await ConsumptionService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await ConsumptionController.update(request, response);
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
			await ConsumptionService.DeleteConsumption(query.id);

			response.status(200).send();
		} catch (e) {
			logger.info('Error: ', e);

			if (e.code && e.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.consumptionToken = (await ConsumptionService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await ConsumptionController.delete(request, response);
				} catch (tokenError) {
					response.status(500).json(tokenError);
				}
			} else {
				response.status(500).json(e);
			}
		}
	}
}
