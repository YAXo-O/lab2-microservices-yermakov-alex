import { post } from '../utils/requests';

export default class UserService {
	public static CreateUser(login: string, hash: string) {
		return post(this.baseUrl, {
			hash,
			login,
		});
	}

	private static baseUrl: string = 'http://localhost:8004/api/private/v1/user';
}
