import * as request from '../utils/requests';

export default class QueueService {
	public static Enqueue(host: string, endpoint: string, query: object) {
		return request.post(this.baseUrl, {
			body: {},
			endpoint,
			host,
			method: 'DELETE',
			query,
		});
	}

	private static baseUrl: string = 'http://localhost:8005/api/private/v1/queue';
}