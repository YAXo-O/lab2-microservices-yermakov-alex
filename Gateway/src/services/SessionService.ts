import * as request from '../utils/requests';

export default class SessionService {
	public static CreateSession(adminId: string, title: string, description?: string) {
		return request.post(this.baseUrl, {
			adminId,
			description,
			title,
		});
	}

	public static GetSession(id: string) {
		return request.get(this.baseUrl, {
			id,
		});
	}

	public static GetSessions(page?: number) {
		return request.get(this.baseUrl, {
			page,
		});
	}

	public static UpdateSession(id: string, title?: string, description?: string) {
		return request.update(this.baseUrl, {
			description,
			id,
			title,
		});
	}

	public static DeleteSession(id: string) {
		return request.remove(this.baseUrl, {
			id,
		});
	}

	private static baseUrl: string = 'http://localhost:8000/api/private/v1/session';
}
