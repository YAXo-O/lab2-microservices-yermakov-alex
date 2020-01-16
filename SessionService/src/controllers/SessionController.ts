import { validate } from '@decorators/index';
import {Response} from 'express';
import {getRepository} from 'typeorm';
import {Session} from '../entity/Session';
import BaseRequest from '../interfaces/BaseRequest';
import CreateParams from '../interfaces/CreateParams';
import DeleteParams from '../interfaces/DeleteParams';
import GetParams from '../interfaces/GetParams';
import PageResponse from '../interfaces/PageResponse';
import UpdateParams from '../interfaces/UpdateParams';
import { logger } from '../logger';

export default class SessionController {
	@validate
	public static async create(request: BaseRequest<CreateParams>, response: Response) {
		const body = request.body;
		const session = {
			adminId: body.adminId,
			description: body.description,
			title: body.title,
		};

		logger.info('Creating new session with parameters: ', session);

		try {
			const repository = getRepository(Session);
			const result = await repository.save(session);

			logger.info('Created new session: ', result);

			response.status(201).json(result);
		} catch (error) {
			logger.info('Unable to create new session: ', error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@validate
	public static async get(request: BaseRequest<{}, GetParams>, response: Response) {
		try {
			const repository = getRepository(Session);

			if (request.query.id) {
				const item = await repository.findOne(request.query.id);

				logger.info('Retrieved session by id: ', item);

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
				});
				const pageResponse: PageResponse<Session> = {
					items,
					page,
					totalCount,
					totalPages: Math.ceil(totalCount / size),
				};

				logger.info('Retrieved sessions page: ', items);

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

		logger.info(`Updating session with id ${params.id}`);

		try {
			const values: any = {};
			if (params.adminId) {
				values.adminId = params.adminId;
			}
			if (params.title) {
				values.title = params.title;
			}
			if (params.description || params.description === null) {
				values.description = params.description;
			}

			if (Object.keys(values).length === 0) {
				response.status(200).send();

				logger.info(`Session with id ${params.id} doesn't require updating.`);

				return;
			}

			const repository = getRepository(Session);
			await repository.update(params.id, values);

			logger.info(`Updated session with id ${params.id}. Updated values: `, values);

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

		logger.info(`Deleting session with id ${id}`);

		try {
			const repository = getRepository(Session);
			await repository.delete(id);

			logger.info(`Session with id ${id} has been deleted`);

			response.status(200).send();
		} catch (error) {
			logger.info(`Unable to delete session with id ${id}: `, error);

			response.status(500).json({
				reason: error,
			});
		}
	}
}
