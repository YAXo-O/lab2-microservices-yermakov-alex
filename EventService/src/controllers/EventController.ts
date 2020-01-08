import { validate } from '@decorators/index';
import {Response} from 'express';
import {getRepository} from 'typeorm';
import {Event} from '../entity/Event';
import BaseRequest from '../interfaces/BaseRequest';
import CreateParams from '../interfaces/CreateParams';
import DeleteParams from '../interfaces/DeleteParams';
import GetParams from '../interfaces/GetParams';
import PageResponse from '../interfaces/PageResponse';
import UpdateParams from '../interfaces/UpdateParams';
import { logger } from '../logger';

export default class EventController {
	@validate
	public static async create(request: BaseRequest<CreateParams>, response: Response) {
		const body = request.body;
		const session = {
			investorId: body.investorId,
			sessionId: body.sessionId,
		};

		logger.info('Creating new event with parameters: ', session);

		try {
			const repository = getRepository(Event);
			const result = await repository.save(session);

			logger.info('Created new event: ', result);

			response.status(201).json(result);
		} catch (error) {
			logger.info('Unable to create new event: ', error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@validate
	public static async get(request: BaseRequest<{}, GetParams>, response: Response) {
		logger.info('Retrieving event(s)');
		try {
			const repository = getRepository(Event);

			if (request.query.id) {
				const item = await repository.findOne(request.query.id);

				logger.info('Retrieved event by id: ', item);

				response.status(200).json(item);
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
				});
				const pageResponse: PageResponse<Event> = {
					items,
					page,
					totalCount,
					totalPages: Math.ceil(totalCount / size),
				};

				logger.info('Retrieved events page: ', items);

				response.status(200).json(pageResponse);
			}

		} catch (error) {
			logger.info('Failed to retrieve events. Reason: ', error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@validate
	public static async update(request: BaseRequest<UpdateParams>, response: Response) {
		const params = request.body;

		logger.info(`Updating event with id ${params.id}`);

		try {
			const values: any = {};
			if (params.sessionId) {
				values.sessionId = params.sessionId;
			}
			if (params.investorId) {
				values.investorId = params.investorId;
			}

			if (Object.keys(values).length === 0) {
				response.status(200).send();

				logger.info(`Event with id ${params.id} doesn't require updating.`);

				return;
			}

			const repository = getRepository(Event);
			await repository.update(params.id, values);

			logger.info(`Updated event with id ${params.id}. Updated values: `, values);

			response.status(200).send();
		} catch (error) {
			logger.info(`Unable to update session with id ${params.id}: `, error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@validate
	public static async delete(request: BaseRequest<{}, DeleteParams>, response: Response) {
		const id = request.query.id;

		logger.info(`Deleting event with id ${id}`);

		try {
			const repository = getRepository(Event);
			await repository.delete(id);

			logger.info(`Event with id ${id} has been deleted`);

			response.status(200).send();
		} catch (error) {
			logger.info(`Unable to delete event with id ${id}: `, error);

			response.status(500).json({
				reason: error,
			});
		}
	}
}
