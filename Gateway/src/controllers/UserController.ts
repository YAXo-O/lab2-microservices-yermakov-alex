import { validate } from '@decorators/index';
import {Response} from 'express';
import BaseRequest from '../interfaces/BaseRequest';
import RegisterParams from '../interfaces/UserParams/RegisterParams';
import { logger } from '../logger';
import UserService from '../services/UserService';

export default class UserController {
	@validate
	public static async register(request: BaseRequest<RegisterParams>, response: Response) {
		const body = request.body;
		// const saltRounds = 10;

		try {
			logger.info('Hashing given password');
			// const pwdHash = await hash(body.password, saltRounds);
			const result = await UserService.CreateUser(body.login, 'password hash');

			logger.info('User has been successfully created: ', result);

			response.status(201).json(result);
		} catch (e) {
			logger.info('Error while creating user: ', e);

			response.status(500).json(e);
		}
	}
}
