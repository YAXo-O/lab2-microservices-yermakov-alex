import { Response } from 'jest-express/lib/response';

import EventController from '@controller/EventController';
import EventValidation from '@validation/EventValidation';
import { logger } from '../../src/logger';
import { executeValidation, prepareDataMocks, url } from '../utils';

jest.mock('../../src/services/EventService');
import EventService from '../../src/services/EventService';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'POST');
	await executeValidation(request, response, EventValidation.create());
	await EventController.create(request as any, response as any);

	return response;
}

logger.silent = true;

describe('Gateway Create Event tests', () => {
	test('Valid input #1', async () => {
		const result = 'Success';
		// @ts-ignore
		EventService.CreateEvent.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			investorId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			sessionId: '78791c47-270d-4701-9e98-a1f5a07ead45',
		});

		expect(response.status).toBeCalledWith(201);
		expect(response.json).toBeCalledWith(result);
	});

	test('Invalid input #1', async () => {
		// @ts-ignore
		EventService.CreateEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			investorId: '2a2129ab-23aa-4e75-a0bd',
			sessionId: '78791c47-270d-4701-9e98-a1f5a07ead45',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		// @ts-ignore
		EventService.CreateEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			investorId: 42,
			sessionId: '78791c47-270d-4701-9e98-a1f5a07ead45',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		// @ts-ignore
		EventService.CreateEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			sessionId: '78791c47-270d-4701-9e98-a1f5a07ead45',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #4', async () => {
		// @ts-ignore
		EventService.CreateEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			investorId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			sessionId: '78791c47-270d-4701-9e98',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #5', async () => {
		// @ts-ignore
		EventService.CreateEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			investorId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			sessionId: 42,
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #6', async () => {
		// @ts-ignore
		EventService.CreateEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			investorId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Remote service error', async () => {
		const error = 'Error';
		// @ts-ignore
		EventService.CreateEvent.mockReturnValue(Promise.reject(error));

		const response = await callEndpoint({
			investorId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			sessionId: '78791c47-270d-4701-9e98-a1f5a07ead45',
		});

		expect(response.status).toBeCalledWith(500);
		expect(response.json).toBeCalledWith(error);
	});
});
