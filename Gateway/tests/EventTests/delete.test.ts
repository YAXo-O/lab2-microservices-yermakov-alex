import { Response } from 'jest-express/lib/response';

import EventController from '@controller/EventController';
import EventValidation from '@validation/EventValidation';
import { logger } from '../../src/logger';
import { executeValidation, prepareDataMocks, url } from '../utils';

jest.mock('../../src/services/ConsumptionService');
jest.mock('../../src/services/EventService');
import ConsumptionService from '../../src/services/ConsumptionService';
import EventService from '../../src/services/EventService';

async function callEndpoint(query: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, {}, query, 'DELETE');
	await executeValidation(request, response, EventValidation.delete());
	await EventController.delete(request as any, response as any);

	return response;
}

logger.silent = true;

describe('Gateway Delete Event tests', () => {
	test('Valid input #1', async () => {
		const result = 'Success';
		// @ts-ignore
		EventService.DeleteEvent.mockReturnValue(Promise.resolve(result));
		// @ts-ignore
		ConsumptionService.DeleteConsumptionByEvent.mockReturnValue(Promise.resolve(null));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalled();
	});

	test('Invalid input #1', async () => {
		// @ts-ignore
		EventService.DeleteEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd',
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		// @ts-ignore
		EventService.DeleteEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
			id: 42,
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		// @ts-ignore
		EventService.DeleteEvent.mockReturnValue(Promise.resolve({}));

		const response = await callEndpoint({
		});

		expect(response.status).toBeCalledWith(400);
	});

	test('Remote service error', async () => {
		const error = 'Error';
		// @ts-ignore
		EventService.DeleteEvent.mockReturnValue(Promise.reject(error));

		const response = await callEndpoint({
			id: '2a2129ab-23aa-4e75-a0bd-b4b48480b730',
		});

		expect(response.status).toBeCalledWith(500);
		expect(response.json).toBeCalledWith(error);
	});
});
