import { Response } from 'jest-express/lib/response';

import ConsumerController from '@controller/ConsumerController';
import ConsumerValidation from '@validation/ConsumerValidation';
import { logger } from '../../src/logger';
import { executeValidation, prepareDataMocks, url } from '../utils';

jest.mock('../../src/services/ConsumerService');
import ConsumerService from '../../src/services/ConsumerService';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'POST');
	await executeValidation(request, response, ConsumerValidation.create());
	await ConsumerController.create(request as any, response as any);

	return response;
}

logger.silent = true;

describe('Gateway Create Consumer tests', () => {
	test('Valid input #1', async () => {
		const result = 'Success';
		// @ts-ignore
		ConsumerService.CreateConsumer.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			firstName: 'First name',
			lastName: 'Last name',
			sessionId: '78791c47-270d-4701-9e98-a1f5a07ead45',
		});

		expect(response.status).toBeCalledWith(201);
		expect(response.json).toBeCalledWith(result);
	});

	test('Invalid input #1', async () => {
		// @ts-ignore
		ConsumerService.CreateConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			firstName: 42,
			lastName: 'Last name',
			sessionId: '78791c47-270d-4701-9e98-a1f5a07ead45',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		// @ts-ignore
		ConsumerService.CreateConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			lastName: 'Last name',
			sessionId: '78791c47-270d-4701-9e98-a1f5a07ead45',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		// @ts-ignore
		ConsumerService.CreateConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			firstName: 'First name',
			lastName: 42,
			sessionId: '78791c47-270d-4701-9e98-a1f5a07ead45',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #4', async () => {
		// @ts-ignore
		ConsumerService.CreateConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			firstName: 'First name',
			sessionId: '78791c47-270d-4701-9e98-a1f5a07ead45',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #5', async () => {
		// @ts-ignore
		ConsumerService.CreateConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			firstName: 'First name',
			lastName: 'Last name',
			sessionId: '78791c47-270d-4701-9e98',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #6', async () => {
		// @ts-ignore
		ConsumerService.CreateConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			firstName: 'First name',
			lastName: 'Last name',
			sessionId: 42,
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #7', async () => {
		// @ts-ignore
		ConsumerService.CreateConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			firstName: 'First name',
			lastName: 'Last name',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Remote service error', async () => {
		const error = 'Error';
		// @ts-ignore
		ConsumerService.CreateConsumer.mockReturnValue(Promise.reject(error));

		const response = await callEndpoint({
			firstName: 'First name',
			lastName: 'Last name',
			sessionId: '78791c47-270d-4701-9e98-a1f5a07ead45',
		});

		expect(response.status).toBeCalledWith(500);
		expect(response.json).toBeCalledWith(error);
	});
});
