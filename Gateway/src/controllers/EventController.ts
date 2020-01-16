import { validate } from '@decorators/index';
import { Response } from 'express';
import BaseRequest from '../interfaces/BaseRequest';
import CreateParams from '../interfaces/EventParams/CreateParams';
import DeleteParams from '../interfaces/EventParams/DeleteParams';
import GetParams from '../interfaces/EventParams/GetParams';
import UpdateParams from '../interfaces/EventParams/UpdateParams';
import ConsumptionService from '../services/ConsumptionService';
import EventService from '../services/EventService';

export default class SessionController {
	@validate
	public static async create(request: BaseRequest<CreateParams>, response: Response) {
		const body = request.body;

		try {
			const event = await EventService.CreateEvent(body.investorId, body.sessionId);

			response.status(201).json(event);
		} catch (e) {
			response.status(500).json(e);
		}
	}

	@validate
	public static async get(request: BaseRequest<{}, GetParams>, response: Response) {
		const query = request.query;

		try {
			const result = await EventService.GetEvent(query.id, query.page);

			response.status(200).json(result);
		} catch (e) {
			response.status(500).json(e);
		}
	}

	@validate
	public static async update(request: BaseRequest<UpdateParams>, response: Response) {
		const body = request.body;

		try {
			await EventService.UpdateEvent(body.id, body.investorId, body.sessionId);

			response.status(200).send();
		} catch (e) {
			response.status(500).json(e);
		}
	}

	@validate
	public static async delete(request: BaseRequest<{}, DeleteParams>, response: Response) {
		const query = request.query;

		try {
			await EventService.DeleteEvent(query.id);
			await ConsumptionService.DeleteConsumptionByEvent(query.id);

			response.status(200).send();
		} catch (e) {
			response.status(500).json(e);
		}
	}
}
