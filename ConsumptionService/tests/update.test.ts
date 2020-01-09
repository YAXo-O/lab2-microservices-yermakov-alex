import ConsumptionController from '@controller/ConsumptionController';
import { Consumption } from '@entities/Consumption';
import ConsumptionValidation from '@validation/ConsumptionValidation';
import { Response } from 'jest-express/lib/response';
import { resolve } from 'path';
import { createConnection, getConnection, getRepository } from 'typeorm';
import UpdateParams from '../src/interfaces/UpdateParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'PATCH');
	await executeValidation(request, response, ConsumptionValidation.update());
	await ConsumptionController.update(request as any, response as any);

	return response;
}

// Turn off logging for testing
logger.silent = true;

describe('Update Session tests', () => {
	beforeAll(() => {
		return createConnection({
			dropSchema: true,
			entities: [resolve(__dirname, '../src/entity/**/*.ts')],
			logging: false,
			schema: 'update',
			synchronize: true,
			type: 'postgres',
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-consumptions-test',
		});
	});

	afterAll(() => {
		return getConnection().close();
	});

	test('Valid input #1', async () => {
		const repository = getRepository(Consumption);
		const item = await repository.save({
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			cost: 250,
			description: 'Test consumption',
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		});

		const params: UpdateParams = {
			consumerId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
			cost: 350,
			description: 'Updated consumption',
			eventId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			id: item.id,
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.consumerId).toBe(params.consumerId);
		expect(updated.cost).toBe(params.cost);
		expect(updated.description).toBe(params.description);
		expect(updated.eventId).toBe(params.eventId);
	});

	test('Valid input #2', async () => {
		const repository = getRepository(Consumption);
		const item = await repository.save({
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			cost: 250,
			description: 'Test consumption',
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		});

		const params: UpdateParams = {
			cost: 350,
			description: 'Updated consumption',
			eventId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			id: item.id,
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.consumerId).toBe(item.consumerId);
		expect(updated.cost).toBe(params.cost);
		expect(updated.description).toBe(params.description);
		expect(updated.eventId).toBe(params.eventId);
	});

	test('Valid input #3', async () => {
		const repository = getRepository(Consumption);
		const item = await repository.save({
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			cost: 250,
			description: 'Test consumption',
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		});

		const params: UpdateParams = {
			consumerId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
			cost: 350,
			eventId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			id: item.id,
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.consumerId).toBe(params.consumerId);
		expect(updated.cost).toBe(params.cost);
		expect(updated.description).toBe(item.description);
		expect(updated.eventId).toBe(params.eventId);
	});

	test('Valid input #4', async () => {
		const repository = getRepository(Consumption);
		const item = await repository.save({
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			cost: 250,
			description: 'Test consumption',
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		});

		const params: UpdateParams = {
			consumerId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
			cost: 350,
			description: 'Updated consumption',
			id: item.id,
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.consumerId).toBe(params.consumerId);
		expect(updated.cost).toBe(params.cost);
		expect(updated.description).toBe(params.description);
		expect(updated.eventId).toBe(item.eventId);
	});

	test('Valid input #5', async () => {
		const params: UpdateParams = {
			id: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(200);
	});

	test('Invalid input #1', async () => {
		const params = {
			consumerId: '8c10c34d-0413-445d-8cb2',
			cost: 350,
			description: 'Updated consumption',
			eventId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			id: '80573c2e-6052-426e-bfda-60b3728a3ccc',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		const params = {
			consumerId: 42,
			cost: 350,
			description: 'Updated consumption',
			eventId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			id: '80573c2e-6052-426e-bfda-60b3728a3ccc',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		const params = {
			consumerId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
			cost: 'a',
			description: 'Updated consumption',
			eventId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			id: '80573c2e-6052-426e-bfda-60b3728a3ccc',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #4', async () => {
		const params = {
			consumerId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
			cost: 350,
			description: 42,
			eventId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			id: '80573c2e-6052-426e-bfda-60b3728a3ccc',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #5', async () => {
		const params = {
			consumerId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
			cost: 350,
			description: 'Updated consumption',
			eventId: '981339a7-3fcd-486f-84ae',
			id: '80573c2e-6052-426e-bfda-60b3728a3ccc',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #6', async () => {
		const params = {
			consumerId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
			cost: 350,
			description: 'Updated consumption',
			eventId: 42,
			id: '80573c2e-6052-426e-bfda-60b3728a3ccc',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #7', async () => {
		const params = {
			consumerId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
			cost: 350,
			description: 'Updated consumption',
			eventId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			id: '80573c2e-6052-426e-bfda',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #8', async () => {
		const params = {
			consumerId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
			cost: 350,
			description: 'Updated consumption',
			eventId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			id: 42,
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});
});
