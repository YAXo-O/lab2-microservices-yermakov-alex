import { validate } from '@decorators/index';
import { Response } from 'express';
import BaseRequest from '../interfaces/BaseRequest';
import CreateParams from '../interfaces/ConsumerParams/CreateParams';
import DeleteParams from '../interfaces/ConsumerParams/DeleteParams';
import GetParams from '../interfaces/ConsumerParams/GetParams';
import UpdateParams from '../interfaces/ConsumerParams/UpdateParams';
import ConsumerService from '../services/ConsumerService';

export default class SessionController {
	@validate
	public static async create(request: BaseRequest<CreateParams>, response: Response) {
		const body = request.body;

		try {
			const event = await ConsumerService.CreateConsumer(body.sessionId, body.firstName, body.lastName);

			response.status(201).json(event);
		} catch (e) {
			response.status(500).json(e);
		}
	}

	@validate
	public static async get(request: BaseRequest<{}, GetParams>, response: Response) {
		const query = request.query;

		try {
			const result = await ConsumerService.GetConsumer(query.id, query.page);

			response.status(200).json(result);
		} catch (e) {
			response.status(500).json(e);
		}
	}

	@validate
	public static async update(request: BaseRequest<UpdateParams>, response: Response) {
		const body = request.body;

		try {
			await ConsumerService.UpdateConsumer(body.id, body.firstName, body.lastName);

			response.status(200).send();
		} catch (e) {
			response.status(500).json(e);
		}
	}

	@validate
	public static async delete(request: BaseRequest<{}, DeleteParams>, response: Response) {
		const query = request.query;

		try {
			await ConsumerService.DeleteConsumer(query.id);

			response.status(200).send();
		} catch (e) {
			response.status(500).json(e);
		}
	}
}
