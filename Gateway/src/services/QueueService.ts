import { withCircuitBreaker } from '@decorators/index';
import { logger } from '../logger';
import options from '../utils/CircuitBreakerOptions';
import * as request from '../utils/requests';
import PrivateTokenService from './PrivateTokenService';

export default class QueueService {
	public static Enqueue(host: string, endpoint: string, query: object) {
		return request.post(this.baseUrl, {
			body: {},
			endpoint,
			host,
			method: 'DELETE',
			query,
		}, PrivateTokenService.queueToken);
	}

	@withCircuitBreaker(options)
	public static GetToken() {
		logger.info('Requesting token from queue service');
		return request.get(`${this.baseUrl}/token`, {
			appId: this.queueId,
			appSecret: this.queueSecret,
		}, PrivateTokenService.queueToken);
	}

	private static baseUrl: string = 'http://localhost:8005/api/private/v1/queue';
	private static queueId: string = process.env.QUEUE_ID || 'queue_service_id';
	private static queueSecret: string = process.env.QUEUE_SECRET || 'queue_service_secret';
}
