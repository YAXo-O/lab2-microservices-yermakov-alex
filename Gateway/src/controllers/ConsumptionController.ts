import { validate } from '@decorators/index';
import { Response } from 'express';
import BaseRequest from '../interfaces/BaseRequest';
import CreateParams from '../interfaces/ConsumptionParams/CreateParams';
import DeleteParams from '../interfaces/ConsumptionParams/DeleteParams';
import GetParams from '../interfaces/ConsumptionParams/GetParams';
import UpdateParams from '../interfaces/ConsumptionParams/UpdateParams';
import ConsumptionService from '../services/ConsumptionService';

export default class ConsumptionController {
	@validate
	public static async create(request: BaseRequest<CreateParams>, response: Response) {
		const body = request.body;

		try {
			const consumption = await ConsumptionService.CreateConsumption(
				body.consumerId, body.cost, body.description, body.eventId);

			response.status(201).json(consumption);
		} catch (e) {
			response.status(500).json(e);
		}
	}

	@validate
	public static async get(request: BaseRequest<{}, GetParams>, response: Response) {
		const query = request.query;

		try {
			const result = await ConsumptionService.GetConsumption(query.id, query.page, query.eventId);

			response.status(200).json(result);
		} catch (e) {
			response.status(500).json(e);
		}
	}

	@validate
	public static async update(request: BaseRequest<UpdateParams>, response: Response) {
		const body = request.body;

		try {
			await ConsumptionService.UpdateConsumption(body.id, body.consumerId, body.cost, body.description, body.eventId);

			response.status(200).send();
		} catch (e) {
			response.status(500).json(e);
		}
	}

	@validate
	public static async delete(request: BaseRequest<{}, DeleteParams>, response: Response) {
		const query = request.query;

		try {
			await ConsumptionService.DeleteConsumption(query.id);

			response.status(200).send();
		} catch (e) {
			response.status(500).json(e);
		}
	}
}
