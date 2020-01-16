import { Response } from 'jest-express/lib/response';

import EventController from '@controller/EventController';
import EventValidation from '@validation/EventValidation';
import { logger } from '../../src/logger';
import { executeValidation, prepareDataMocks, url } from '../utils';

jest.mock('../../src/services/EventService');
import EventService from '../../src/services/EventService';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'PATCH');
	await executeValidation(request, response, EventValidation.update());
	await EventController.update(request as any, response as any);

	return response;
}

logger.silent = true;

describe('Gateway Update Event tests', () => {
	test('Valid input #1', async () => {
		const result = 'Success';
		// @ts-ignore
		EventService.UpdateEvent.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			investorId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			sessionId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Valid input #2', async () => {
		const result = 'Success';
		// @ts-ignore
		EventService.UpdateEvent.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			investorId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Valid input #3', async () => {
		const result = 'Success';
		// @ts-ignore
		EventService.UpdateEvent.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			sessionId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Invalid input #1', async () => {
		// @ts-ignore
		EventService.UpdateEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd',
			investorId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			sessionId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		// @ts-ignore
		EventService.UpdateEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			id: 42,
			investorId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			sessionId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		// @ts-ignore
		EventService.UpdateEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			investorId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			sessionId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #4', async () => {
		// @ts-ignore
		EventService.UpdateEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			investorId: '2a2129ab-23aa-4e75-a0bd',
			sessionId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #5', async () => {
		// @ts-ignore
		EventService.UpdateEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			investorId: 42,
			sessionId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #6', async () => {
		// @ts-ignore
		EventService.UpdateEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			investorId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			sessionId: '2a2129ab-23aa-4e75-a0bd',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #7', async () => {
		// @ts-ignore
		EventService.UpdateEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			investorId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			sessionId: 42,
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Remote service error', async () => {
		const error = 'Error';
		// @ts-ignore
		EventService.UpdateEvent.mockReturnValue(Promise.reject(error));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			investorId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			sessionId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(500);
		expect(response.json).toBeCalledWith(error);
	});
});
