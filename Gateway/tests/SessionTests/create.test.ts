import { Response } from 'jest-express/lib/response';

import SessionController from '@controller/SessionController';
import SessionValidation from '@validation/SessionValidation';
import { logger } from '../../src/logger';
import { executeValidation, prepareDataMocks, url } from '../utils';

jest.mock('../../src/services/SessionService');
import SessionService from '../../src/services/SessionService';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'POST');
	await executeValidation(request, response, SessionValidation.create());
	await SessionController.create(request as any, response as any);

	return response;
}

logger.silent = true;

describe('Gateway Create Session tests', () => {
	test('Valid input #1', async () => {
		const result = 'Success';
		// @ts-ignore
		SessionService.CreateSession.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			description: 'test description',
			title: 'test title',
		});

		expect(response.status).toBeCalledWith(201);
		expect(response.json).toBeCalledWith(result);
	});

	test('Valid input #2', async () => {
		const result = 'Success';
		// @ts-ignore
		SessionService.CreateSession.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			title: 'test title',
		});

		expect(response.status).toBeCalledWith(201);
		expect(response.json).toBeCalledWith(result);
	});

	test('Invalid input #1', async () => {
		// @ts-ignore
		SessionService.CreateSession.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			title: 42,
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		// @ts-ignore
		SessionService.CreateSession.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			description: 42,
			title: 'Failure title',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		// @ts-ignore
		SessionService.CreateSession.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Remote service error', async () => {
		const error = 'Error';
		// @ts-ignore
		SessionService.CreateSession.mockReturnValue(Promise.reject(error));

		const response = await callEndpoint({
			title: 'Remote service error',
		});

		expect(response.status).toBeCalledWith(500);
		expect(response.json).toBeCalledWith(error);
	});
});
