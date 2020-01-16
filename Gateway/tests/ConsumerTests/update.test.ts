import { Response } from 'jest-express/lib/response';

import ConsumerController from '@controller/ConsumerController';
import ConsumerValidation from '@validation/ConsumerValidation';
import { logger } from '../../src/logger';
import { executeValidation, prepareDataMocks, url } from '../utils';

jest.mock('../../src/services/ConsumerService');
import ConsumerService from '../../src/services/ConsumerService';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'PATCH');
	await executeValidation(request, response, ConsumerValidation.update());
	await ConsumerController.update(request as any, response as any);

	return response;
}

logger.silent = true;

describe('Gateway Update Consumer tests', () => {
	test('Valid input #1', async () => {
		const result = 'Success';
		// @ts-ignore
		ConsumerService.UpdateConsumer.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			firstName: 'Updated first name',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			lastName: 'Updated last name',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Valid input #2', async () => {
		const result = 'Success';
		// @ts-ignore
		ConsumerService.UpdateConsumer.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			lastName: 'Updated last name',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Valid input #3', async () => {
		const result = 'Success';
		// @ts-ignore
		ConsumerService.UpdateConsumer.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			firstName: 'Updated first name',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730', });

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Invalid input #1', async () => {
		// @ts-ignore
		ConsumerService.UpdateConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			firstName: 'Updated first name',
			id: '2a2129ab-23aa-4e75-a0bd',
			lastName: 'Updated last name',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		// @ts-ignore
		ConsumerService.UpdateConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			firstName: 'Updated first name',
			id: 42,
			lastName: 'Updated last name',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		// @ts-ignore
		ConsumerService.UpdateConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			firstName: 'Updated first name',
			lastName: 'Updated last name',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #4', async () => {
		// @ts-ignore
		ConsumerService.UpdateConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			firstName: 42,
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			lastName: 'Updated last name',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #5', async () => {
		// @ts-ignore
		ConsumerService.UpdateConsumer.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			firstName: 'Updated first name',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			lastName: 42,
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Remote service error', async () => {
		const error = 'Error';
		// @ts-ignore
		ConsumerService.UpdateConsumer.mockReturnValue(Promise.reject(error));

		const response = await callEndpoint({
			firstName: 'Updated first name',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			lastName: 'Updated last name',
		});

		expect(response.status).toBeCalledWith(500);
		expect(response.json).toBeCalledWith(error);
	});
});
