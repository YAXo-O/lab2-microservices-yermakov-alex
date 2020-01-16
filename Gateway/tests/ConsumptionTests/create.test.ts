import { Response } from 'jest-express/lib/response';

import ConsumptionController from '@controller/ConsumptionController';
import ConsumptionValidation from '@validation/ConsumptionValidation';
import { logger } from '../../src/logger';
import { executeValidation, prepareDataMocks, url } from '../utils';

jest.mock('../../src/services/ConsumptionService');
import ConsumptionService from '../../src/services/ConsumptionService';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'POST');
	await executeValidation(request, response, ConsumptionValidation.create());
	await ConsumptionController.create(request as any, response as any);

	return response;
}

logger.silent = true;

describe('Gateway Create Consumption tests', () => {
	test('Valid input #1', async () => {
		const result = 'Success';
		// @ts-ignore
		ConsumptionService.CreateConsumption.mockReturnValue(Promise.resolve(result));

		const response = await callEndpoint({
			consumerId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
			cost: 42,
			description: 'Consumption',
			eventId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
		});

		expect(response.status).toBeCalledWith(201);
		expect(response.json).toBeCalledWith(result);
	});

	test('Invalid input #1', async () => {
		// @ts-ignore
		ConsumptionService.CreateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: 'e51665c2-e40f-469e-b4d3',
			cost: 42,
			description: 'Consumption',
			eventId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		// @ts-ignore
		ConsumptionService.CreateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: 42,
			cost: 42,
			description: 'Consumption',
			eventId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		// @ts-ignore
		ConsumptionService.CreateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			cost: 42,
			description: 'Consumption',
			eventId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #4', async () => {
		// @ts-ignore
		ConsumptionService.CreateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
			cost: '42a',
			description: 'Consumption',
			eventId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #5', async () => {
		// @ts-ignore
		ConsumptionService.CreateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
			description: 'Consumption',
			eventId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #6', async () => {
		// @ts-ignore
		ConsumptionService.CreateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
			cost: 42,
			description: 42,
			eventId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #7', async () => {
		// @ts-ignore
		ConsumptionService.CreateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
			cost: 42,
			eventId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #8', async () => {
		// @ts-ignore
		ConsumptionService.CreateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
			cost: 42,
			description: 'Consumption',
			eventId: 'e51665c2-e40f-469e-b4d3',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #9', async () => {
		// @ts-ignore
		ConsumptionService.CreateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
			cost: 42,
			description: 'Consumption',
			eventId: 42,
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #10', async () => {
		// @ts-ignore
		ConsumptionService.CreateConsumption.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			consumerId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
			cost: 42,
			description: 'Consumption',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Remote service error', async () => {
		const error = 'Error';
		// @ts-ignore
		ConsumptionService.CreateConsumption.mockReturnValue(Promise.reject(error));

		const response = await callEndpoint({
			consumerId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
			cost: 42,
			description: 'Consumption',
			eventId: 'e51665c2-e40f-469e-b4d3-a4da943cde44',
		});

		expect(response.status).toBeCalledWith(500);
		expect(response.json).toBeCalledWith(error);
	});
});
