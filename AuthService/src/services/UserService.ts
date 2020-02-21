import { logger } from '../logger';
import * as requests from '../requests';
import PrivateTokenService from './PrivateTokenService';

export default class UserService {
	public static create(login: string, hash: string) {
		return requests.post(UserService.baseUrl, {
			hash,
			login,
		}, PrivateTokenService.userToken);
	}

	public static get(login: string) {
		return requests.get(UserService.baseUrl, {
			login,
		}, PrivateTokenService.userToken);
	}

	public static getById(id: string) {
		return requests.get(UserService.baseUrl, {
			id,
		}, PrivateTokenService.userToken);
	}

	public static GetToken() {
		logger.info('Requesting token from user service');
		return requests.get(`${this.baseUrl}/token`, {
			appId: this.userId,
			appSecret: this.userSecret,
		}, PrivateTokenService.userToken);
	}

	private static baseUrl: string = 'http://localhost:8004/api/private/v1/user';
	private static userId: string = process.env.USER_ID || 'user_service_id';
	private static userSecret: string = process.env.USER_SECRET || 'user_service_secret';
}
