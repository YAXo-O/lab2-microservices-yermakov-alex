import { validate } from '@decorators/index';
import { Response } from 'express';
import BaseRequest from '../interfaces/BaseRequest';
import CreateParams from '../interfaces/SessionParams/CreateParams';
import DeleteParams from '../interfaces/SessionParams/DeleteParams';
import GetParams from '../interfaces/SessionParams/GetParams';
import UpdateParams from '../interfaces/SessionParams/UpdateParams';
import ConsumerService from '../services/ConsumerService';
import EventService from '../services/EventService';
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
					const events = await EventService.GetEventForSession(session.id);
					const consumers = await ConsumerService.GetConsumerForSession(session.id);

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
			await SessionService.DeleteSession(query.id);
			await EventService.DeleteEventBySession(query.id);
			await ConsumerService.DeleteConsumerBySession(query.id);

			response.status(200).send();
		} catch (e) {
			response.status(500).json(e);
		}
	}
}
