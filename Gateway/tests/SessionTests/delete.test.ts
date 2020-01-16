import { Response } from 'jest-express/lib/response';

import SessionController from '@controller/SessionController';
import SessionValidation from '@validation/SessionValidation';
import { logger } from '../../src/logger';
import { executeValidation, prepareDataMocks, url } from '../utils';

jest.mock('../../src/services/SessionService');
jest.mock('../../src/services/EventService');
jest.mock('../../src/services/ConsumerService');
import SessionService from '../../src/services/SessionService';
import EventService from '../../src/services/EventService';
import ConsumerService from '../../src/services/ConsumerService';

async function callEndpoint(query: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, {}, query, 'DELETE');
	await executeValidation(request, response, SessionValidation.delete());
	await SessionController.delete(request as any, response as any);

	return response;
}

logger.silent = true;

describe('Gateway Delete Session tests', () => {
	test('Valid input #1', async () => {
		// @ts-ignore
		SessionService.DeleteSession.mockReturnValue(Promise.resolve(null));
		// @ts-ignore
		EventService.DeleteEventBySession.mockReturnValue(Promise.resolve(null));
		// @ts-ignore
		ConsumerService.DeleteConsumerBySession.mockReturnValue(Promise.resolve(null));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Invalid input #1', async () => {
		// @ts-ignore
		SessionService.DeleteSession.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		// @ts-ignore
		SessionService.DeleteSession.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			id: 42,
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		// @ts-ignore
		SessionService.DeleteSession.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Remote service error', async () => {
		const error = 'Error';
		// @ts-ignore
		SessionService.DeleteSession.mockReturnValue(Promise.reject(error));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(500);
		expect(response.json).toBeCalledWith(error);
	});
});
