import { User } from '../../../UserService/src/entity/User';
import * as requests from '../requests';

export default class UserService {
	public static create(login: string, hash: string) {
		return requests.post(UserService.baseUrl, {
			hash,
			login,
		});
	}

	public static get(login: string) {
		return requests.get(UserService.baseUrl, {
			login,
		});
	}

	public static getById(id: string) {
		return requests.get(UserService.baseUrl, {
			id,
		});
	}

	private static baseUrl: string = 'http://localhost:8004/api/private/v1/user';
	private static consumerId: string = process.env.USER_ID || 'user_service_id';
	private static consumerSecret: string = process.env.USER_SECRET || 'user_service_secret';
}
