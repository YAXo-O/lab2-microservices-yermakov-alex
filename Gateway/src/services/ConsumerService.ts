import { withCircuitBreaker } from '@decorators/index';
import options from '../utils/CircuitBreakerOptions';
import * as request from '../utils/requests';

export default class ConsumerService {
	@withCircuitBreaker(options)
	public static CreateConsumer(sessionId: string, firstName: string, lastName: string) {
		return request.post(this.baseUrl, {
			firstName,
			lastName,
			sessionId,
		});
	}

	@withCircuitBreaker(options)
	public static GetConsumer(id?: string, page?: number, sessionId?: string) {
		return request.get(this.baseUrl, {
			id,
			page,
			sessionId,
		});
	}

	@withCircuitBreaker(options)
	public static GetConsumerForSession(sessionId: string) {
		return request.get(this.baseUrl, {
			sessionId,
		});
	}

	@withCircuitBreaker(options)
	public static UpdateConsumer(id: string, firstName: string, lastName: string) {
		return request.update(this.baseUrl, {
			firstName,
			id,
			lastName,
		});
	}

	@withCircuitBreaker(options)
	public static DeleteConsumer(id: string) {
		return request.remove(this.baseUrl, {
			id,
		});
	}

	@withCircuitBreaker(options)
	public static DeleteConsumerBySession(id: string) {
		return request.remove(this.baseUrl, {
			bySession: true,
			id,
		});
	}

	private static baseUrl: string = 'http://localhost:8001/api/private/v1/consumer';
}
