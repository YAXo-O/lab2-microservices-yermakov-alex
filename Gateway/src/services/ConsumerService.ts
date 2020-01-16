import * as request from '../utils/requests';

export default class ConsumerService {
	public static CreateConsumer(sessionId: string, firstName: string, lastName: string) {
		return request.post(this.baseUrl, {
			firstName,
			lastName,
			sessionId,
		});
	}

	public static GetConsumer(id?: string, page?: number) {
		return request.get(this.baseUrl, {
			id,
			page,
		});
	}

	public static GetConsumerForSession(sessionId: string) {
		return request.get(this.baseUrl, {
			sessionId,
		});
	}

	public static UpdateConsumer(id: string, firstName: string, lastName: string) {
		return request.update(this.baseUrl, {
			firstName,
			id,
			lastName,
		});
	}

	public static DeleteConsumer(id: string) {
		return request.remove(this.baseUrl, {
			id,
		});
	}

	public static DeleteConsumerBySession(id: string) {
		return request.remove(this.baseUrl, {
			bySession: true,
			id,
		});
	}

	private static baseUrl: string = 'http://localhost:8001/api/private/v1/consumer';
}
