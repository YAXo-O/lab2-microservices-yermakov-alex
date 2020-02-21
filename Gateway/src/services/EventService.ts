import { withCircuitBreaker } from '@decorators/index';
import { logger } from '../logger';
import options from '../utils/CircuitBreakerOptions';
import * as request from '../utils/requests';
import PrivateTokenService from './PrivateTokenService';

export default class EventService {
	@withCircuitBreaker(options)
	public static CreateEvent(title: string, investorId: string, sessionId: string) {
		return request.post(this.baseUrl, {
			investorId,
			sessionId,
			title,
		}, PrivateTokenService.eventToken);
	}

	@withCircuitBreaker(options)
	public static GetEvent(id?: string, page?: number, sessionId?: string) {
		return request.get(this.baseUrl, {
			id,
			page,
			sessionId,
		}, PrivateTokenService.eventToken);
	}

	@withCircuitBreaker(options)
	public static GetEventForSession(sessionId: string) {
		return request.get(this.baseUrl, {
			sessionId,
		}, PrivateTokenService.eventToken);
	}

	@withCircuitBreaker(options)
	public static UpdateEvent(id: string, title?: string, investorId?: string, sessionId?: string) {
		return request.update(this.baseUrl, {
			id,
			investorId,
			sessionId,
			title,
		}, PrivateTokenService.eventToken);
	}

	@withCircuitBreaker(options)
	public static DeleteEvent(id: string) {
		return request.remove(this.baseUrl, {
			id,
		}, PrivateTokenService.eventToken);
	}

	@withCircuitBreaker(options)
	public static DeleteEventBySession(id: string) {
		return request.remove(this.baseUrl, {
			bySession: true,
			id,
		}, PrivateTokenService.eventToken);
	}

	@withCircuitBreaker(options)
	public static RestoreEvent(id: string, sessionId: string, investorId: string, dateCreated: Date) {
		return request.restore(this.baseUrl, {
			dateCreated: dateCreated.getMilliseconds(),
			id,
			investorId,
			sessionId,
		}, PrivateTokenService.eventToken);
	}

	@withCircuitBreaker(options)
	public static GetToken() {
		logger.info('Requesting token from event service');
		return request.get(`${this.baseUrl}/token`, {
			appId: this.eventId,
			appSecret: this.eventSecret,
		}, PrivateTokenService.eventToken);
	}

	private static baseUrl: string = 'http://localhost:8002/api/private/v1/event';
	private static eventId: string = process.env.EVENT_ID || 'event_service_id';
	private static eventSecret: string = process.env.EVENT_SECRET || 'event_service_secret';
}
