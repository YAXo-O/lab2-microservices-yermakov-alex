import EventController from '@controller/EventController';
import { Event } from '@entities/Event';
import EventValidation from '@validation/EventValidation';
import { Response } from 'jest-express/lib/response';
import { resolve } from 'path';
import { createConnection, getConnection, getRepository } from 'typeorm';
import UpdateParams from '../src/interfaces/UpdateParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'PATCH');
	await executeValidation(request, response, EventValidation.update());
	await EventController.update(request as any, response as any);

	return response;
}

// Turn off logging for testing
logger.silent = true;

describe('Update Event tests', () => {
	beforeAll(() => {
		return createConnection({
			dropSchema: true,
			entities: [resolve(__dirname, '../src/entity/**/*.ts')],
			logging: false,
			schema: 'update',
			synchronize: true,
			type: 'postgres',
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-events-test',
		});
	});

	afterAll(() => {
		return getConnection().close();
	});

	test('Valid input #1', async () => {
		const repository = getRepository(Event);
		const item = await repository.save({
			investorId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		});

		const params: UpdateParams = {
			id: item.id,
			investorId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.investorId).toBe(params.investorId);
		expect(updated.sessionId).toBe(params.sessionId);
	});

	test('Valid input #2', async () => {
		const repository = getRepository(Event);
		const item = await repository.save({
			investorId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		});

		const params: UpdateParams = {
			id: item.id,
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.sessionId).toBe(item.sessionId);
		expect(updated.investorId).toBe(item.investorId);
	});

	test('Valid input #3', async () => {
		const repository = getRepository(Event);
		const item = await repository.save({
			investorId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		});

		const params: UpdateParams = {
			id: item.id,
			investorId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.investorId).toBe(params.investorId);
		expect(updated.sessionId).toBe(item.sessionId);
	});

	test('Valid input #4', async () => {
		const repository = getRepository(Event);
		const item = await repository.save({
			investorId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		});

		const params: UpdateParams = {
			id: item.id,
			sessionId: '3ae1864e-e746-40c0-9d2e-58825c161418',
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.investorId).toBe(item.investorId);
		expect(updated.sessionId).toBe(params.sessionId);
	});

	test('Invalid input #1', async () => {
		const repository = getRepository(Event);
		const item = await repository.save({
			investorId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		});

		const params = {
			id: item.id,
			investorId: 42,
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		const repository = getRepository(Event);
		const item = await repository.save({
			investorId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		});

		const params = {
			id: item.id,
			sessionId: 42,
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});
});
