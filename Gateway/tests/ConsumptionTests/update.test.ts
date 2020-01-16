import { Response } from 'jest-express/lib/response';

import ConsumptionController from '@controller/ConsumptionController';
import ConsumptionValidation from '@validation/ConsumptionValidation';
import { logger } from '../../src/logger';
import { executeValidation, prepareDataMocks, url } from '../utils';

jest.mock('../../src/services/ConsumptionService');
import ConsumptionService from '../../src/services/ConsumptionService';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'PATCH');
	await executeValidation(request, response, ConsumptionValidation.update());
	await ConsumptionController.update(request as any, response as any);

	return response;
}

logger.silent = true;

describe('Gateway Update Consumption tests', () => {
	test('Valid input #1', async () => {
		const result = 'Success';
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			consumerId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			cost: 42,
			description: 'Description',
			eventId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Valid input #2', async () => {
		const result = 'Success';
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			consumerId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Valid input #3', async () => {
		const result = 'Success';
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			cost: 42,
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Valid input #3', async () => {
		const result = 'Success';
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			description: 'Description',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Valid input #4', async () => {
		const result = 'Success';
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			eventId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Invalid input #1', async () => {
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: '2a2129ab-23aa-4e75-a0bd',
			cost: 42,
			description: 'Description',
			eventId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: 42,
			cost: 42,
			description: 'Description',
			eventId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			cost: 'cde',
			description: 'Description',
			eventId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #4', async () => {
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			cost: 42,
			description: 42,
			eventId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #5', async () => {
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			cost: 42,
			description: 'Description',
			eventId: '2a2129ab-23aa-4e75-a0bd',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #6', async () => {
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			cost: 42,
			description: 'Description',
			eventId: 42,
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #7', async () => {
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			cost: 42,
			description: 'Description',
			eventId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			id: '2a2129ab-23aa-4e75-a0bd',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #8', async () => {
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			cost: 42,
			description: 'Description',
			eventId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			id: 42,
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #9', async () => {
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			cost: 42,
			description: 'Description',
			eventId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Remote service error', async () => {
		const error = 'Error';
		// @ts-ignore
		ConsumptionService.UpdateConsumption.mockReturnValue(Promise.reject(error));

		const response = await callEndpoint({
			consumerId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			cost: 42,
			description: 'Description',
			eventId: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(500);
		expect(response.json).toBeCalledWith(error);
	});
});
