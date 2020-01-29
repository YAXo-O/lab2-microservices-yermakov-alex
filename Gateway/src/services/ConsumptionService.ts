import { withCircuitBreaker } from '@decorators/index';
import options from '../utils/CircuitBreakerOptions';
import * as request from '../utils/requests';

export default class ConsumptionService {
	@withCircuitBreaker(options)
	public static CreateConsumption(consumerId: string, cost: number, description: string, eventId: string) {
		return request.post(this.baseUrl, {
			consumerId,
			cost,
			description,
			eventId,
		});
	}

	@withCircuitBreaker(options)
	public static GetConsumption(id?: string, page?: number, eventId?: string) {
		return request.get(this.baseUrl, {
			eventId,
			id,
			page,
		});
	}

	@withCircuitBreaker(options)
	public static GetConsumptions(eventId: string) {
		return request.get(this.baseUrl, {
			eventId,
		});
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
		});
	}

	@withCircuitBreaker(options)
	public static DeleteConsumption(id: string) {
		return request.remove(this.baseUrl, {
			id,
		});
	}

	@withCircuitBreaker(options)
	public static DeleteConsumptionByEvent(id: string) {
		return request.remove(this.baseUrl, {
			byEvent: true,
			id,
		});
	}

	private static baseUrl: string = 'http://localhost:8003/api/private/v1/consumption';
}
