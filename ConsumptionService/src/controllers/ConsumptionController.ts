import { validate } from '@decorators/index';
import {Response} from 'express';
import {getRepository} from 'typeorm';
import {Consumption} from '../entity/Consumption';
import BaseRequest from '../interfaces/BaseRequest';
import CreateParams from '../interfaces/CreateParams';
import DeleteParams from '../interfaces/DeleteParams';
import GetParams from '../interfaces/GetParams';
import PageResponse from '../interfaces/PageResponse';
import RestoreParams from '../interfaces/RestoreParams';
import UpdateParams from '../interfaces/UpdateParams';
import { logger } from '../logger';

export default class ConsumptionController {
	@validate
	public static async create(request: BaseRequest<CreateParams>, response: Response) {
		const body = request.body;
		const session = {
			consumerId: body.consumerId,
			cost: body.cost,
			description: body.description,
			eventId: body.eventId,
		};

		logger.info('Creating new consumption with parameters: ', session);

		try {
			const repository = getRepository(Consumption);
			const result = await repository.save(session);

			logger.info('Created new consumption: ', result);

			response.status(201).json(result);
		} catch (error) {
			logger.info('Unable to create new consumption: ', error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@validate
	public static async get(request: BaseRequest<{}, GetParams>, response: Response) {
		logger.info('Retrieving consumption(s)');
		try {
			const repository = getRepository(Consumption);

			if (request.query.id) {
				const item = await repository.findOne(request.query.id);

				logger.info('Retrieved consumption by id: ', item);

				response.status(200).json(item || null);
			} else {
				const page = +request.query.page || 0;
				const size = 20; // 20 items per page
				const offset = size * page;

				const [items, totalCount] = await repository.findAndCount({
					order: {
						dateCreated: 'ASC',
					},
					skip: offset,
					take: size,
					where: request.query.eventId ? {
						eventId: request.query.eventId,
					} : undefined,
				});
				const pageResponse: PageResponse<Consumption> = {
					items,
					page,
					totalCount,
					totalPages: Math.ceil(totalCount / size),
				};

				logger.info('Retrieved consumptions page: ', items);

				response.status(200).json(pageResponse);
			}

		} catch (error) {
			logger.info('Failed to retrieve sessions. Reason: ', error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@validate
	public static async update(request: BaseRequest<UpdateParams>, response: Response) {
		const params = request.body;

		logger.info(`Updating consumption with id ${params.id}`);

		try {
			const values: any = {};
			if (params.consumerId) {
				values.consumerId = params.consumerId;
			}
			if (params.cost) {
				values.cost = params.cost;
			}
			if (params.description) {
				values.description = params.description;
			}
			if (params.eventId) {
				values.eventId = params.eventId;
			}

			if (Object.keys(values).length === 0) {
				response.status(200).send();

				logger.info(`Event with id ${params.id} doesn't require updating.`);

				return;
			}

			const repository = getRepository(Consumption);
			await repository.update(params.id, values);

			logger.info(`Updated event with id ${params.id}. Updated values: `, values);

			response.status(200).send();
		} catch (error) {
			logger.info(`Unable to update event with id ${params.id}: `, error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@validate
	public static async delete(request: BaseRequest<{}, DeleteParams>, response: Response) {
		const id = request.query.id;
		const byEvent = request.query.byEvent;

		logger.info(`Deleting consumption with ${byEvent ? 'event id' : 'id'} ${id}`);

		try {
			const repository = getRepository(Consumption);
			await repository.delete(byEvent ? {eventId: id} : id);

			logger.info(`Consumption(s) have been deleted`);

			response.status(200).send();
		} catch (error) {
			logger.info(`Unable to delete consumption with id ${id}: `, error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@validate
	public static async restore(request: BaseRequest<RestoreParams>, response: Response) {
		const body = request.body;
		logger.info('Restoring entity: ', body);

		try {
			const repository = getRepository(Consumption);
			await repository.save({
				consumerId: body.consumerId,
				cost: body.cost,
				dateCreated: new Date(body.dateCreated),
				description: body.description,
				eventId: body.eventId,
				id: body.id,
			});

			logger.info('Successfully restored entity');

			response.status(200).json({});
		} catch (e) {
			logger.info('Unable to restore entity: ', e);

			response.status(500).json({
				reason: e,
			});
		}
	}
}
