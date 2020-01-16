import { Response } from 'jest-express/lib/response';

import ConsumerController from '@controller/ConsumerController';
import ConsumerValidation from '@validation/ConsumerValidation';
import { logger } from '../../src/logger';
import { executeValidation, prepareDataMocks, url } from '../utils';

jest.mock('../../src/services/ConsumerService');
import ConsumerService from '../../src/services/ConsumerService';

async function callEndpoint(query: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, {}, query, 'GET');
	await executeValidation(request, response, ConsumerValidation.get());
	await ConsumerController.get(request as any, response as any);

	return response;
}

logger.silent = true;

describe('Gateway Get Consumer tests', () => {
	test('Valid input #1', async () => {
		const result = 'Success';
		// @ts-ignore
		ConsumerService.GetConsumer.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.json).toBeCalledWith(result);
	});

	test('Valid input #2', async () => {
		const result = 'Success';
		// @ts-ignore
		ConsumerService.GetConsumer.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.json).toBeCalledWith(result);
	});

	test('Valid input #3', async () => {
		const result = 'Success';
		// @ts-ignore
		ConsumerService.GetConsumer.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			page: 20,
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.json).toBeCalledWith(result);
	});

	test('Invalid input #1', async () => {
		// @ts-ignore
		ConsumerService.GetConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		// @ts-ignore
		ConsumerService.GetConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			id: 32,
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		// @ts-ignore
		ConsumerService.GetConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			page: 'page',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Remote service error', async () => {
		const error = 'Error';
		// @ts-ignore
		ConsumerService.GetConsumer.mockReturnValue(Promise.reject(error));

		const response = await callEndpoint({
		});

		expect(response.status).toBeCalledWith(500);
		expect(response.json).toBeCalledWith(error);
	});
});
