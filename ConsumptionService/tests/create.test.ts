import ConsumptionController from '@controller/ConsumptionController';
import ConsumptionValidation from '@validation/ConsumptionValidation';
import { Response } from 'jest-express/lib/response';
import { resolve } from 'path';
import { createConnection, getConnection } from 'typeorm';
import CreateParams from '../src/interfaces/CreateParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'POST');
	await executeValidation(request, response, ConsumptionValidation.create());
	await ConsumptionController.create(request as any, response as any);

	return response;
}

// Turn off logging for testing
logger.silent = true;

describe('Create Session tests', () => {
	beforeAll(() => {
		return createConnection({
			dropSchema: true,
			entities: [resolve(__dirname, '../src/entity/**/*.ts')],
			logging: false,
			schema: 'create',
			synchronize: true,
			type: 'postgres',
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-consumptions-test',
		});
	});

	afterAll(() => {
		return getConnection().close();
	});

	test('Valid input #1', async () => {
		const params: CreateParams = {
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			cost: 250,
			description: 'Test consumption',
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(201);
		expect(response.json).toBeCalledWith(expect.objectContaining(params));
	});

	test('Invalid input #1', async () => {
		const params: CreateParams = {
			consumerId: '981339a7-3fcd-486f-84ae',
			cost: 250,
			description: 'Test consumption',
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		const params = {
			consumerId: 42,
			cost: 250,
			description: 'Test consumption',
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		const params = {
			cost: 250,
			description: 'Test consumption',
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #4', async () => {
		const params = {
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			cost: 'abc',
			description: 'Test consumption',
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #5', async () => {
		const params = {
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			description: 'Test consumption',
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #6', async () => {
		const params = {
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			cost: 250,
			description: 42,
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #7', async () => {
		const params = {
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			cost: 250,
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #8', async () => {
		const params = {
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			cost: 250,
			description: 'Test consumption',
			eventId: '8c10c34d-0413-445d-8cb2',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #9', async () => {
		const params = {
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			cost: 250,
			description: 'Test consumption',
			eventId: 42,
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #10', async () => {
		const params = {
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			cost: 250,
			description: 'Test consumption',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});
});
