import { withCircuitBreaker } from '@decorators/index';
import { logger } from '../logger';
import options from '../utils/CircuitBreakerOptions';
import * as request from '../utils/requests';
import PrivateTokenService from './PrivateTokenService';

export default class ConsumerService {
	@withCircuitBreaker(options)
	public static CreateConsumer(sessionId: string, firstName: string, lastName: string) {
		return request.post(this.baseUrl, {
			firstName,
			lastName,
			sessionId,
		}, PrivateTokenService.consumerToken);
	}

	@withCircuitBreaker(options)
	public static GetConsumer(id?: string, page?: number, sessionId?: string) {
		return request.get(this.baseUrl, {
			id,
			page,
			sessionId,
		}, PrivateTokenService.consumerToken);
	}

	@withCircuitBreaker(options)
	public static GetConsumerForSession(sessionId: string) {
		return request.get(this.baseUrl, {
			sessionId,
		}, PrivateTokenService.consumerToken);
	}

	@withCircuitBreaker(options)
	public static UpdateConsumer(id: string, firstName: string, lastName: string) {
		return request.update(this.baseUrl, {
			firstName,
			id,
			lastName,
		}, PrivateTokenService.consumerToken);
	}

	@withCircuitBreaker(options)
	public static DeleteConsumer(id: string) {
		return request.remove(this.baseUrl, {
			id,
		}, PrivateTokenService.consumerToken);
	}

	@withCircuitBreaker(options)
	public static DeleteConsumerBySession(id: string) {
		return request.remove(this.baseUrl, {
			bySession: true,
			id,
		}, PrivateTokenService.consumerToken);
	}

	@withCircuitBreaker(options)
	public static GetToken() {
		logger.info('Requesting token from consumer service');
		return request.get(`${this.baseUrl}/token`, {
			appId: this.consumerId,
			appSecret: this.consumerSecret,
		}, PrivateTokenService.consumerToken);
	}

	private static baseUrl: string = 'http://localhost:8001/api/private/v1/consumer';
	private static consumerId: string = process.env.CONSUMER_ID || 'consumer_service_id';
	private static consumerSecret: string = process.env.CONSUMER_SECRET || 'consumer_service_secret';
}
