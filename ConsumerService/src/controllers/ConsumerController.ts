import { enclosed, validate } from '@decorators/index';
import {Response} from 'express';
import {getRepository} from 'typeorm';

import TokenManager from '../TokenManager';

import {Consumer} from '../entity/Consumer';
import BaseRequest from '../interfaces/BaseRequest';
import CreateParams from '../interfaces/CreateParams';
import DeleteParams from '../interfaces/DeleteParams';
import GetParams from '../interfaces/GetParams';
import PageResponse from '../interfaces/PageResponse';
import TokenParams from '../interfaces/TokenParams';
import UpdateParams from '../interfaces/UpdateParams';
import { logger } from '../logger';

export default class ConsumerController {
	@enclosed
	@validate
	public static async create(request: BaseRequest<CreateParams>, response: Response) {
		const body = request.body;
		const consumer = {
			firstName: body.firstName,
			lastName: body.lastName,
			sessionId: body.sessionId,
		};

		logger.info('Creating new consumer with parameters: ', consumer);

		try {
			const repository = getRepository(Consumer);
			const result = await repository.save(consumer);

			logger.info('Created new consumer: ', result);

			response.status(201).json(result);
		} catch (error) {
			logger.info('Unable to create new consumer: ', error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@enclosed
	@validate
	public static async get(request: BaseRequest<{}, GetParams>, response: Response) {
		logger.info('Retrieving consumer(s)');
		try {
			const repository = getRepository(Consumer);

			if (request.query.id) {
				const item = await repository.findOne(request.query.id);

				logger.info('Retrieved consumer by id: ', item);

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
					where: request.query.sessionId ? {
						sessionId: request.query.sessionId,
					} : undefined,
				});
				const pageResponse: PageResponse<Consumer> = {
					items,
					page,
					totalCount,
					totalPages: Math.ceil(totalCount / size),
				};

				logger.info('Retrieved consumer page: ', items);

				response.status(200).json(pageResponse);
			}

		} catch (error) {
			logger.info('Failed to retrieve consumers. Reason: ', error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@enclosed
	@validate
	public static async update(request: BaseRequest<UpdateParams>, response: Response) {
		const params = request.body;

		logger.info(`Updating consumer with id ${params.id}`);

		try {
			const values: any = {};
			if (params.sessionId) {
				values.sessionId = params.sessionId;
			}
			if (params.firstName) {
				values.firstName = params.firstName;
			}
			if (params.lastName) {
				values.lastName = params.lastName;
			}

			if (Object.keys(values).length === 0) {
				response.status(200).send();

				logger.info(`Consumer with id ${params.id} doesn't require updating.`);

				return;
			}

			const repository = getRepository(Consumer);
			await repository.update(params.id, values);

			logger.info(`Updated consumer with id ${params.id}. Updated values: `, values);

			response.status(200).send();
		} catch (error) {
			logger.info(`Unable to update consumer with id ${params.id}: `, error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@enclosed
	@validate
	public static async delete(request: BaseRequest<{}, DeleteParams>, response: Response) {
		const id = request.query.id;
		const bySession = request.query.bySession;

		logger.info(`Deleting consumer with ${bySession ? 'session id' : 'id'} ${id}`);

		try {
			const repository = getRepository(Consumer);
			await repository.delete(bySession ? {sessionId: id} : id);

			logger.info(`Consumer(s) have been deleted`);

			response.status(200).send();
		} catch (error) {
			logger.info(`Unable to delete consumer with id ${id}: `, error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@enclosed
	@validate
	public static async token(request: BaseRequest<{}, TokenParams>, response: Response) {
		logger.info('Requesting token');
		const {appId, appSecret} = request.query;
		logger.info(`Credentials: ${appId}, ${appSecret}`);
		if (appId === ConsumerController.appId && appSecret === ConsumerController.appSecret) {
			logger.info('New token has been dispatched');
			response.status(200).json({
				token: TokenManager.createToken(),
			});
		} else {
			logger.info('Incorrect credentials were provided. No token was dispatched.');
			response.status(400).json({
				reason: 'Incorrect credentials',
			});
		}
	}

	private static appId: string = process.env.APPLICATION_ID || 'consumer_service_id';
	private static appSecret: string = process.env.APPLICATION_SECRET || 'consumer_service_secret';
}
