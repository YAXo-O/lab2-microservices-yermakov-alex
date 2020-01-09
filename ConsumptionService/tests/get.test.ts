import ConsumptionController from '@controller/ConsumptionController';
import { Consumption } from '@entities/Consumption';
import ConsumptionValidation from '@validation/ConsumptionValidation';
import { Response } from 'jest-express/lib/response';
import { resolve } from 'path';
import { createConnection, getConnection, getRepository } from 'typeorm';
import GetParams from '../src/interfaces/GetParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';

async function callEndpoint(query: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, {}, query, 'GET');
	await executeValidation(request, response, ConsumptionValidation.get());
	await ConsumptionController.get(request as any, response as any);

	return response;
}

// Turn off logging for testing
logger.silent = true;

describe('Get Sessions tests', () => {
	beforeAll(() => {
		return createConnection({
			dropSchema: true,
			entities: [resolve(__dirname, '../src/entity/**/*.ts')],
			logging: false,
			schema: 'get',
			synchronize: true,
			type: 'postgres',
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-consumptions-test',
		});
	});

	afterAll(() => {
		return getConnection().close();
	});

	test('Valid input #1', async () => {
		const query: GetParams = {
			page: 0,
		};

		const response = await callEndpoint(query);

		expect(response.status).toBeCalledWith(200);
	});

	test('Valid input #2', async () => {
		const query: GetParams = {
		};

		const response = await callEndpoint(query);

		expect(response.status).toBeCalledWith(200);
	});

	test('Existing item', async () => {
		const repository = getRepository(Consumption);
		const item = await repository.save({
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			cost: 250,
			description: 'Test consumption',
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		});

		const query: GetParams = {
			id: item.id,
		};

		const response = await callEndpoint(query);

		expect(response.status).toBeCalledWith(200);
		expect(response.json).toBeCalledWith(item);
	});

	test('Non-existing item', async () => {
		const query: GetParams = {
			id: 'e77ab26b-4187-4710-a409-05ee81edb11c',
		};

		const response = await callEndpoint(query);

		expect(response.status).toBeCalledWith(200);
		expect(response.json).toBeCalledWith(undefined);
	});

	test('Invalid input #1', async () => {
		const query = {
			page: 'alpha',
		};

		const response = await callEndpoint(query);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		const query = {
			id: 'e77ab26b-4187-4710-a409',
		};

		const response = await callEndpoint(query);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		const query = {
			id: 42,
		};

		const response = await callEndpoint(query);

		expect(response.status).toBeCalledWith(400);
	});
});
