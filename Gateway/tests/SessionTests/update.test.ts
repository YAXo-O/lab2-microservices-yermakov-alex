import { Response } from 'jest-express/lib/response';

import SessionController from '@controller/SessionController';
import SessionValidation from '@validation/SessionValidation';
import { logger } from '../../src/logger';
import { executeValidation, prepareDataMocks, url } from '../utils';

jest.mock('../../src/services/SessionService');
import SessionService from '../../src/services/SessionService';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'PATCH');
	await executeValidation(request, response, SessionValidation.update());
	await SessionController.update(request as any, response as any);

	return response;
}

logger.silent = true;

describe('Gateway Update Session tests', () => {
	test('Valid input #1', async () => {
		const result = 'Success';
		// @ts-ignore
		SessionService.UpdateSession.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			title: 'updated',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Valid input #2', async () => {
		const result = 'Success';
		// @ts-ignore
		SessionService.UpdateSession.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			description: 'updated',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Invalid input #1', async () => {
		// @ts-ignore
		SessionService.UpdateSession.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			description: 'updated',
			id: '2a2129ab-23aa-4e75-a0bd',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		// @ts-ignore
		SessionService.UpdateSession.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			description: 'updated',
			id: 42,
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		// @ts-ignore
		SessionService.UpdateSession.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			description: 'updated',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		// @ts-ignore
		SessionService.UpdateSession.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			description: 42,
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #4', async () => {
		// @ts-ignore
		SessionService.UpdateSession.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			title: 42,
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('External service error', async () => {
		const error = 'Error';
		// @ts-ignore
		SessionService.UpdateSession.mockReturnValue(Promise.reject(error));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			title: 'updated',
		});

		expect(response.status).toBeCalledWith(500);
		expect(response.json).toBeCalledWith(error);
	});
});
