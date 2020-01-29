import { withCircuitBreaker } from '@decorators/index';
import { logger } from '../logger';
import options from '../utils/CircuitBreakerOptions';
import * as request from '../utils/requests';

export default class SessionService {
	@withCircuitBreaker(options)
	public static CreateSession(adminId: string, title: string, description?: string) {
		return request.post(this.baseUrl, {
			adminId,
			description,
			title,
		});
	}

	@withCircuitBreaker(options)
	public static GetSession(id: string) {
		return request.get(this.baseUrl, {
			id,
		});
	}

	@withCircuitBreaker(options)
	public static GetSessions(page?: number) {
		logger.info('Calling get sessions');
		return request.get(this.baseUrl, {
			page,
		});
	}

	@withCircuitBreaker(options)
	public static UpdateSession(id: string, title?: string, description?: string) {
		return request.update(this.baseUrl, {
			description,
			id,
			title,
		});
	}

	@withCircuitBreaker(options)
	public static DeleteSession(id: string) {
		return request.remove(this.baseUrl, {
			id,
		});
	}

	private static baseUrl: string = 'http://localhost:8000/api/private/v1/session';
}
