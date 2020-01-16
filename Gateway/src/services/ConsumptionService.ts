import * as request from '../utils/requests';

export default class ConsumptionService {
	public static CreateConsumption(consumerId: string, cost: number, description: string, eventId: string) {
		return request.post(this.baseUrl, {
			consumerId,
			cost,
			description,
			eventId,
		});
	}

	public static GetConsumption(id?: string, page?: number) {
		return request.get(this.baseUrl, {
			id,
			page,
		});
	}

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

	public static DeleteConsumption(id: string) {
		return request.remove(this.baseUrl, {
			id,
		});
	}

	public static DeleteConsumptionByEvent(id: string) {
		return request.remove(this.baseUrl, {
			byEvent: true,
			id,
		});
	}

	private static baseUrl: string = 'http://localhost:8003/api/private/v1/consumption';
}
