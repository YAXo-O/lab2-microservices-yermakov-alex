import * as bcrypt from 'bcrypt';
import {Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {getRepository} from 'typeorm';

import { validate } from '@decorators/index';
import {AuthSession} from '../entity/AuthSession';
import BaseRequest from '../interfaces/BaseRequest';
import CreateParams from '../interfaces/CreateParams';
import GetParams from '../interfaces/GetParams';
import LoginParams from '../interfaces/LoginParams';
import RefreshParams from '../interfaces/RefreshParams';
import TokenParams from '../interfaces/TokenParams';
import { logger } from '../logger';
import PrivateTokenService from '../services/PrivateTokenService';
import UserService from '../services/UserService';

export default class AuthController {
	@validate
	public static async register(request: BaseRequest<CreateParams>, response: Response) {
		const body = request.body;
		const session = {
			hash: await bcrypt.hash(body.password, AuthController.saltRounds),
			login: body.login,
		};

		logger.info('Creating new user with parameters: ', session);

		try {
			await UserService.create(session.login, session.hash);

			response.status(201).send();
		} catch (error) {
			logger.info('Error: ', error);

			if (error.code && error.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.userToken = (await UserService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await AuthController.register(request, response);
				} catch (tokenError) {
					response.status(500).json(tokenError);
				}
			} else {
				response.status(500).json(error);
			}
		}
	}

	@validate
	public static async getCode(request: BaseRequest<LoginParams>, response: Response) {
		const { login, password, redirectUrl } = request.body;

		logger.info(`Fetching user with login ${login}`);
		try {
			const user = await UserService.get(login) as {id: string, login: string, hash: string};

			if (user === null) {
				logger.info('User not found');
				response.status(404).send();
			} else if (await bcrypt.compare(password, user.hash)) {
				logger.info('User found; Generating access code;');
				const code = jwt.sign({
					id: user.id,
					login: user.login,
				}, AuthController.privateKey, {
					expiresIn: 300,
				});

				response.redirect(303, `${redirectUrl}?code=${code}`);
			} else {
				logger.info('Incorrect login/password pair');
				response.status(406).send();
			}
		} catch (error) {
			logger.info(`Unable to get code for user ${login}: `, error);

			if (error.code && error.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.userToken = (await UserService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await AuthController.getCode(request, response);
				} catch (tokenError) {
					response.status(500).json(tokenError);
				}
			} else {
				response.status(500).json(error);
			}
		}
	}

	@validate
	public static async getToken(request: BaseRequest<TokenParams>, response: Response) {
		const { code } = request.body;

		logger.info('Retrieving token for code');
		try {
			if (jwt.verify(code, AuthController.privateKey)) {
				logger.info('Code is accepted. Generating token');
				const decoded = jwt.decode(code) as {
					id: string,
					login: string,
				};

				const token = jwt.sign({
					id: decoded.id,
					login: decoded.login,
				}, AuthController.privateKey, {
						expiresIn:  10, // 3600, // hour
					});
				logger.info(`Token: ${token}`);
				const refresh = jwt.sign({
					token,
				}, AuthController.privateKey, {
					expiresIn: 86400, // 24 hours
				});
				logger.info(`Refresh: ${refresh}`);

				const repository = getRepository(AuthSession);
				await repository.save({
					accessCode: code,
					refreshToken: refresh,
					token,
				});

				response.status(200).json({
					refresh,
					token,
				});
			}
		} catch (error) {
			logger.info('An error occurred while trying to get token: ', error);

			if (error.code && error.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.userToken = (await UserService.GetToken() as {token: string}).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await AuthController.getToken(request, response);
				} catch (tokenError) {
					response.status(500).json(tokenError);
				}
			} else if (error.code && error.code === '23505') {
				response.status(406).json({
					reason: 'Access code has already been used',
				});
			} else if (error.name && error.name === 'TokenExpiredError') {
				response.status(406).json({
					reason: 'Access code has expired',
				});
			} else {
				response.status(500).json({
					reason: error,
				});
			}
		}
	}

	@validate
	public static async getUser(request: BaseRequest<GetParams>, response: Response) {
		const { token } = request.body;

		try {
			if (jwt.verify(token, AuthController.privateKey)) {
				logger.info('Token is valid; Retrieving user data');

				const repository = getRepository(AuthSession);
				const session = await repository.findOne({
					token,
				});

				if (!session || (+(new Date()) - +session.lastActionTime) > 1800000) {
					await repository.delete({ token });

					response.redirect(303, '/refreshToken');
				}

				await repository.update({token}, { lastActionTime: new Date() });

				const user = await UserService.get((jwt.decode(token) as { login: string }).login) as { login: string, id: string };
				response.status(200).json({
					id: user.id,
					login: user.login,
				});
			} else {
				response.status(406).json({
					reason: 'Invalid token',
				});
			}
		} catch (error) {
			logger.info('Unable to get user: ', error);

			if (error.name && error.name === 'TokenExpiredError') {
				response.redirect(303, '/refreshToken');
			} else {
				response.status(500).json({
					reason: error,
				});
			}
		}
	}

	@validate
	public static async refreshToken(request: BaseRequest<RefreshParams>, response: Response) {
		const { refreshToken } = request.body;

		try {
			logger.info('Deleting session');
			const repository = getRepository(AuthSession);
			await repository.delete({ refreshToken });

			if (jwt.verify(refreshToken, AuthController.privateKey)) {
				logger.info('Updating token');

				const token = (jwt.decode(refreshToken) as { token: string }).token;
				const login = (jwt.decode(token) as { login: string }).login;

				const user = await UserService.get(login) as { id: string, login: string };

				const newToken = jwt.sign({
					id: user.id,
					login: user.login,
				}, AuthController.privateKey, {
					expiresIn:  3600, // hour
				});
				logger.info(`New Token: ${newToken}`);
				const refresh = jwt.sign({
					newToken,
				}, AuthController.privateKey, {
					expiresIn: 86400, // 24 hours
				});
				logger.info(`Refresh: ${refresh}`);

				await repository.save({
					accessCode: refreshToken,
					refreshToken: refresh,
					token: newToken,
				});

				response.status(200).json({
					newToken,
					refresh,
				});
			}
		} catch (error) {
			logger.info('Error while refreshing token: ', error);

			if (error.code && error.code === 303) {
				logger.info('Token is rotten or absent. Redirecting to get new token.');
				try {
					PrivateTokenService.userToken = (await UserService.GetToken() as { token: string }).token;
					logger.info('Logger\'s been retrieved. Refetching.');
					await AuthController.refreshToken(request, response);
				} catch (tokenError) {
					response.status(500).json(tokenError);
				}
			} else if (error.name && error.name === 'TokenExpiredError') {
				response.status(406).json({
					reason: 'Refresh token has expired',
				});
			} else if (error.code && error.code === '23505') {
				response.status(406).json({
					reason: 'Refresh token has already been used',
				});
			} else {
				response.status(500).json({
					reason: error,
				});
			}
		}
	}

	private static readonly saltRounds = 10;
	private static readonly privateKey = process.env.CODE_PRIVATE || 'code_private_key';
}
