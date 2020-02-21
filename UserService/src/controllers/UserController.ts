import {Response} from 'express';
import {getRepository} from 'typeorm';

import { enclosed, validate } from '@decorators/index';
import {User} from '../entity/User';
import BaseRequest from '../interfaces/BaseRequest';
import CreateParams from '../interfaces/CreateParams';
import DeleteParams from '../interfaces/DeleteParams';
import GetParams from '../interfaces/GetParams';
import PageResponse from '../interfaces/PageResponse';
import TokenParams from '../interfaces/TokenParams';
import UpdateParams from '../interfaces/UpdateParams';
import { logger } from '../logger';
import TokenManager from '../TokenManager';

export default class UserController {
	@enclosed
	@validate
	public static async create(request: BaseRequest<CreateParams>, response: Response) {
		const body = request.body;
		const session = {
			hash: body.hash,
			login: body.login,
		};

		logger.info('Creating new user with parameters: ', session);

		try {
			const repository = getRepository(User);
			const result = await repository.save(session);

			logger.info('Created new user: ', result);

			response.status(201).json(result);
		} catch (error) {
			logger.info('Unable to create new user: ', error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@enclosed
	@validate
	public static async get(request: BaseRequest<{}, GetParams>, response: Response) {
		logger.info('Retrieving user(s)');
		try {
			const repository = getRepository(User);

			if (request.query.id) {
				const item = await repository.findOne(request.query.id);

				logger.info('Retrieved user by id: ', item);

				response.status(200).json(item || {});
			} else if (request.query.login) {
				const item = await repository.findOne({login: request.query.login});

				logger.info('Retrieved user by login: ', item);

				response.status(200).json(item || {});
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
				const pageResponse: PageResponse<User> = {
					items,
					page,
					totalCount,
					totalPages: Math.ceil(totalCount / size),
				};

				logger.info('Retrieved users page: ', items);

				response.status(200).json(pageResponse);
			}

		} catch (error) {
			logger.info('Failed to retrieve users. Reason: ', error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@enclosed
	@validate
	public static async update(request: BaseRequest<UpdateParams>, response: Response) {
		const params = request.body;

		logger.info(`Updating user with id ${params.id}`);

		try {
			const values: any = {};
			if (params.login) {
				values.login = params.login;
			}
			if (params.hash) {
				values.hash = params.hash;
			}

			if (Object.keys(values).length === 0) {
				response.status(200).send();

				logger.info(`User with id ${params.id} doesn't require updating.`);

				return;
			}

			const repository = getRepository(User);
			await repository.update(params.id, values);

			logger.info(`Updated user with id ${params.id}. Updated values: `, values);

			response.status(200).send();
		} catch (error) {
			logger.info(`Unable to update user with id ${params.id}: `, error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@enclosed
	@validate
	public static async delete(request: BaseRequest<{}, DeleteParams>, response: Response) {
		const id = request.query.id;

		logger.info(`Deleting user with id ${id}`);

		try {
			const repository = getRepository(User);
			await repository.delete(id);

			logger.info(`User with id ${id} has been deleted`);

			response.status(200).send();
		} catch (error) {
			logger.info(`Unable to delete user with id ${id}: `, error);

			response.status(500).json({
				reason: error,
			});
		}
	}

	@validate
	public static async token(request: BaseRequest<{}, TokenParams>, response: Response) {
		logger.info('Requesting token');
		const {appId, appSecret} = request.query;
		logger.info(`Credentials: ${appId}, ${appSecret}`);
		if (appId === UserController.appId && appSecret === UserController.appSecret) {
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

	private static appId: string = process.env.APPLICATION_ID || 'user_service_id';
	private static appSecret: string = process.env.APPLICATION_SECRET || 'user_service_secret';
}
