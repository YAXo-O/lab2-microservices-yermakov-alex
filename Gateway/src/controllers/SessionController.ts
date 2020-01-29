import { validate } from '@decorators/index';
import { Response } from 'express';
import BaseRequest from '../interfaces/BaseRequest';
import CreateParams from '../interfaces/SessionParams/CreateParams';
import DeleteParams from '../interfaces/SessionParams/DeleteParams';
import GetParams from '../interfaces/SessionParams/GetParams';
import UpdateParams from '../interfaces/SessionParams/UpdateParams';
import { logger } from '../logger';
import ConsumerService from '../services/ConsumerService';
import EventService from '../services/EventService';
import QueueService from '../services/QueueService';
import SessionService from '../services/SessionService';

export default class SessionController {
	@validate
	public static async create(request: BaseRequest<CreateParams>, response: Response) {
		const adminId = 'e9b8a54e-1f17-4947-b95c-2187790dbc92'; // TODO: fetch admin id from current user
		const body = request.body;

		try {
			const session = await SessionService.CreateSession(adminId, body.title, body.description);

			response.status(201).json(session);
		} catch (e) {
			response.status(500).json(e);
		}
	}

	@validate
	public static async get(request: BaseRequest<{}, GetParams>, response: Response) {
		const query = request.query;

		try {
			if (!!query.id) {
				const result = await SessionService.GetSession(query.id);
				if (result !== null) {
					const session = result as {id: string};
					let events = null;
					try {
						events = await EventService.GetEventForSession(session.id);
					} catch (e) {
						logger.info('Error occurred while fetching events: ', e);
					}

					let consumers = null;
					try {
						consumers = await ConsumerService.GetConsumerForSession(session.id);
					} catch (e) {
						logger.info('Error occurred while fetching consumers: ', e);
					}

					response.status(200).json({
						consumers,
						events,
						...session,
					});

					return;
				}

				response.status(200).json(result);
			} else {
				const result = await SessionService.GetSessions(query.page);

				response.status(200).json(result);
			}

		} catch (e) {
			response.status(500).json(e);
		}
	}

	@validate
	public static async update(request: BaseRequest<UpdateParams>, response: Response) {
		const body = request.body;

		try {
			await SessionService.UpdateSession(body.id, body.title, body.description);

			response.status(200).send();
		} catch (e) {
			response.status(500).json(e);
		}
	}

	@validate
	public static async delete(request: BaseRequest<{}, DeleteParams>, response: Response) {
		const query = request.query;

		try {
			try {
				await SessionService.DeleteSession(query.id);
			} catch (e) {
				if (e.unreachable) {
					logger.info('Session service is unavailable. Queuing');
					await QueueService.Enqueue('localhost:8000', '/api/private/v1/session', {
						id: query.id,
					});
				} else {
					throw e;
				}
			}
			try {
				await EventService.DeleteEventBySession(query.id);
			} catch (e) {
				if (e.unreachable) {
					logger.info('Event service is unavailable. Queuing');
					await QueueService.Enqueue('localhost:8002', '/api/private/v1/event', {
						bySession: true,
						id: query.id,
					});
				} else {
					throw e;
				}
			}
			try {
				await ConsumerService.DeleteConsumerBySession(query.id);
			} catch (e) {
				if (e.unreachable) {
					logger.info('Consumer service is unavailable. Queuing');
					await QueueService.Enqueue('localhost:8001', '/api/private/v1/consumer', {
						bySession: true,
						id: query.id,
					});
				} else {
					throw e;
				}
			}

			response.status(200).send();
		} catch (e) {
			logger.info('Caught an error during delete: ', e);
			response.status(500).json(e);
		}
	}
}
