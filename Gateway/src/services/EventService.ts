import { withCircuitBreaker } from '@decorators/index';
import options from '../utils/CircuitBreakerOptions';
import * as request from '../utils/requests';

export default class EventService {
	@withCircuitBreaker(options)
	public static CreateEvent(title: string, investorId: string, sessionId: string) {
		return request.post(this.baseUrl, {
			investorId,
			sessionId,
			title,
		});
	}

	@withCircuitBreaker(options)
	public static GetEvent(id?: string, page?: number, sessionId?: string) {
		return request.get(this.baseUrl, {
			id,
			page,
			sessionId,
		});
	}

	@withCircuitBreaker(options)
	public static GetEventForSession(sessionId: string) {
		return request.get(this.baseUrl, {
			sessionId,
		});
	}

	@withCircuitBreaker(options)
	public static UpdateEvent(id: string, title?: string, investorId?: string, sessionId?: string) {
		return request.update(this.baseUrl, {
			id,
			investorId,
			sessionId,
			title,
		});
	}

	@withCircuitBreaker(options)
	public static DeleteEvent(id: string) {
		return request.remove(this.baseUrl, {
			id,
		});
	}

	@withCircuitBreaker(options)
	public static DeleteEventBySession(id: string) {
		return request.remove(this.baseUrl, {
			bySession: true,
			id,
		});
	}

	@withCircuitBreaker(options)
	public static RestoreEvent(id: string, sessionId: string, investorId: string, dateCreated: Date) {
		return request.restore(this.baseUrl, {
			dateCreated: dateCreated.getMilliseconds(),
			id,
			investorId,
			sessionId,
		});
	}

	private static baseUrl: string = 'http://localhost:8002/api/private/v1/event';
}
