import { withCircuitBreaker } from '@decorators/index';
import { logger } from '../logger';
import options from '../utils/CircuitBreakerOptions';
import * as request from '../utils/requests';
import PrivateTokenService from './PrivateTokenService';

export default class SessionService {
	@withCircuitBreaker(options)
	public static CreateSession(adminId: string, title: string, description?: string) {
		logger.info(`Creating new session: admin id = ${adminId}, title = ${title}, description = ${description}`);
		return request.post(this.baseUrl, {
			adminId,
			description,
			title,
		}, PrivateTokenService.sessionToken);
	}

	@withCircuitBreaker(options)
	public static GetSession(id: string) {
		logger.info(`Getting session by id ${id}`);
		return request.get(this.baseUrl, {
			id,
		}, PrivateTokenService.sessionToken);
	}

	@withCircuitBreaker(options)
	public static GetSessions(page?: number) {
		logger.info('Calling get sessions');
		return request.get(this.baseUrl, {
			page,
		}, PrivateTokenService.sessionToken);
	}

	@withCircuitBreaker(options)
	public static UpdateSession(id: string, title?: string, description?: string) {
		logger.info(`Updating session: id ${id}, title ${title}, description ${description}`);
		return request.update(this.baseUrl, {
			description,
			id,
			title,
		}, PrivateTokenService.sessionToken);
	}

	@withCircuitBreaker(options)
	public static DeleteSession(id: string) {
		logger.info(`Deleting session ${id}`);
		return request.remove(this.baseUrl, {
			id,
		}, PrivateTokenService.sessionToken);
	}

	@withCircuitBreaker(options)
	public static GetToken() {
		logger.info('Requesting token from session service');
		return request.get(`${this.baseUrl}/token`, {
			appId: this.sessionId,
			appSecret: this.sessionSecret,
		}, PrivateTokenService.sessionToken);
	}

	private static baseUrl: string = 'http://localhost:8000/api/private/v1/session';
	private static sessionId: string = process.env.SESSION_ID || 'session_service_id';
	private static sessionSecret: string = process.env.SESSION_SECRET || 'session_service_secret';
}
