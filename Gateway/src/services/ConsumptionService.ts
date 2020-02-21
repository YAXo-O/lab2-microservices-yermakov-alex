import { withCircuitBreaker } from '@decorators/index';
import { logger } from '../logger';
import options from '../utils/CircuitBreakerOptions';
import * as request from '../utils/requests';
import PrivateTokenService from './PrivateTokenService';

export default class ConsumptionService {
	@withCircuitBreaker(options)
	public static CreateConsumption(consumerId: string, cost: number, description: string, eventId: string) {
		return request.post(this.baseUrl, {
			consumerId,
			cost,
			description,
			eventId,
		}, PrivateTokenService.consumptionToken);
	}

	@withCircuitBreaker(options)
	public static GetConsumption(id?: string, page?: number, eventId?: string) {
		return request.get(this.baseUrl, {
			eventId,
			id,
			page,
		}, PrivateTokenService.consumptionToken);
	}

	@withCircuitBreaker(options)
	public static GetConsumptions(eventId: string) {
		return request.get(this.baseUrl, {
			eventId,
		}, PrivateTokenService.consumptionToken);
	}

	@withCircuitBreaker(options)
	public static UpdateConsumption(
		id: string, consumerId?: string, cost?: number, description?: string, eventId?: string) {
		return request.update(this.baseUrl, {
			consumerId,
			cost,
			description,
			eventId,
			id,
		}, PrivateTokenService.consumptionToken);
	}

	@withCircuitBreaker(options)
	public static DeleteConsumption(id: string) {
		return request.remove(this.baseUrl, {
			id,
		}, PrivateTokenService.consumptionToken);
	}

	@withCircuitBreaker(options)
	public static DeleteConsumptionByEvent(id: string) {
		return request.remove(this.baseUrl, {
			byEvent: true,
			id,
		}, PrivateTokenService.consumptionToken);
	}

	@withCircuitBreaker(options)
	public static GetToken() {
		logger.info('Requesting token from session service');
		return request.get(`${this.baseUrl}/token`, {
			appId: this.consumptionId,
			appSecret: this.consumptionSecret,
		}, PrivateTokenService.consumptionToken);
	}

	private static baseUrl: string = 'http://localhost:8003/api/private/v1/consumption';
	private static consumptionId: string = process.env.CONSUMPTION_ID || 'consumption_service_id';
	private static consumptionSecret: string = process.env.CONSUMPTION_SECRET || 'consumption_service_secret';
}
