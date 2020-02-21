import ConsumptionController from '@controller/ConsumptionController';
import { validate } from '@decorators/index';
import { Response } from 'express';
import BaseRequest from '../interfaces/BaseRequest';
import CreateParams from '../interfaces/EventParams/CreateParams';
import DeleteParams from '../interfaces/EventParams/DeleteParams';
import GetParams from '../interfaces/EventParams/GetParams';
import UpdateParams from '../interfaces/EventParams/UpdateParams';
import { logger } from '../logger';
import ConsumerService from '../services/ConsumerService';
import ConsumptionService from '../services/ConsumptionService';
import EventService from '../services/EventService';
import PrivateTokenService from '../services/PrivateTokenService';
import QueueService from '../services/QueueService';

export default class EventController {
	@validate
	public static async create(request: BaseRequest<CreateParams>, response: Response) {
		const body = request.body;

		try {
			const event = await EventService.CreateEvent(body.title, body.investorId, body.sessionId);

			response.status(201).json(event);
		} catch (e) {
			logger.info('Error: ', e);

			if (e.code && e.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.eventToken = (await EventService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await EventController.create(request, response);
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
			const result = await EventService.GetEvent(query.id, query.page, query.sessionId);
			if (query.id) {
				const res = result as any;
				res.consumptions = await ConsumptionService.GetConsumptions(query.id);
			}

			response.status(200).json(result);
		} catch (e) {
			logger.info('Error: ', e);

			if (e.code && e.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.eventToken = (await EventService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await EventController.get(request, response);
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
			await EventService.UpdateEvent(body.id, body.title, body.investorId, body.sessionId);

			response.status(200).send();
		} catch (e) {
			logger.info('Error: ', e);

			if (e.code && e.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.eventToken = (await EventService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await EventController.update(request, response);
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
			const event: any = await EventService.GetEvent(query.id);

			try {
				await EventService.DeleteEvent(query.id);
			} catch (e) {
				if (e.unreachable) {
					logger.info('Event service is unavailable. Rolling back');
				}
				throw e;
			}
			try {
				await ConsumptionService.DeleteConsumptionByEvent(query.id);
			} catch (e) {
				if (e.unreachable) {
					logger.info('Consumption service is unavailable. Rolling back');
					await EventService.RestoreEvent(event.id, event.sessionId, event.investorId, new Date(event.dateCreated));

					throw e;
				}
			}

			response.status(200).send();
		} catch (e) {
			logger.info('Error: ', e);

			if (e.code && e.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.eventToken = (await EventService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await EventController.delete(request, response);
				} catch (tokenError) {
					response.status(500).json(tokenError);
				}
			} else {
				response.status(500).json(e);
			}
		}
	}
}
