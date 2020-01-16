import * as request from '../utils/requests';

export default class EventService {
	public static CreateEvent(investorId: string, sessionId: string) {
		return request.post(this.baseUrl, {
			investorId,
			sessionId,
		});
	}

	public static GetEvent(id?: string, page?: number) {
		return request.get(this.baseUrl, {
			id,
			page,
		});
	}

	public static GetEventForSession(sessionId: string) {
		return request.get(this.baseUrl, {
			sessionId,
		});
	}

	public static UpdateEvent(id: string, investorId?: string, sessionId?: string) {
		return request.update(this.baseUrl, {
			id,
			investorId,
			sessionId,
		});
	}

	public static DeleteEvent(id: string) {
		return request.remove(this.baseUrl, {
			id,
		});
	}

	public static DeleteEventBySession(id: string) {
		return request.remove(this.baseUrl, {
			bySession: true,
			id,
		});
	}

	private static baseUrl: string = 'http://localhost:8002/api/private/v1/event';
}
