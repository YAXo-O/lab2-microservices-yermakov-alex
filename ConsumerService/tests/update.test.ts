import ConsumerController from '@controller/ConsumerController';
import { Consumer } from '@entities/Consumer';
import ConsumerValidation from '@validation/ConsumerValidation';
import { Response } from 'jest-express/lib/response';
import { resolve } from 'path';
import { createConnection, getConnection, getRepository } from 'typeorm';
import UpdateParams from '../src/interfaces/UpdateParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'PATCH');
	await executeValidation(request, response, ConsumerValidation.update());
	await ConsumerController.update(request as any, response as any);

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
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-consumers-test',
		});
	});

	afterAll(() => {
		return getConnection().close();
	});

	test('Valid input #1', async () => {
		const repository = getRepository(Consumer);
		const item = await repository.save({
			firstName: 'First Name',
			lastName: 'Last Name',
			sessionId: '3ae1864e-e746-40c0-9d2e-58825c161418',
		});

		const params: UpdateParams = {
			firstName: 'Updated First Name',
			id: item.id,
			lastName: 'Updated Last Name',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.sessionId).toBe(params.sessionId);
		expect(updated.firstName).toBe(params.firstName);
		expect(updated.lastName).toBe(params.lastName);
	});

	test('Valid input #2', async () => {
		const repository = getRepository(Consumer);
		const item = await repository.save({
			firstName: 'First Name',
			lastName: 'Last Name',
			sessionId: '3ae1864e-e746-40c0-9d2e-58825c161418',
		});

		const params: UpdateParams = {
			id: item.id,
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.sessionId).toBe(item.sessionId);
		expect(updated.firstName).toBe(item.firstName);
		expect(updated.lastName).toBe(item.lastName);
	});

	test('Valid input #3', async () => {
		const repository = getRepository(Consumer);
		const item = await repository.save({
			firstName: 'First Name',
			lastName: 'Last Name',
			sessionId: '3ae1864e-e746-40c0-9d2e-58825c161418',
		});

		const params: UpdateParams = {
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			id: item.id,
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.sessionId).toBe(params.sessionId);
		expect(updated.firstName).toBe(item.firstName);
		expect(updated.lastName).toBe(item.lastName);
	});

	test('Valid input #4', async () => {
		const repository = getRepository(Consumer);
		const item = await repository.save({
			firstName: 'First Name',
			lastName: 'Last Name',
			sessionId: '3ae1864e-e746-40c0-9d2e-58825c161418',
		});

		const params: UpdateParams = {
			firstName: 'Updated first name',
			id: item.id,
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.sessionId).toBe(item.sessionId);
		expect(updated.firstName).toBe(params.firstName);
		expect(updated.lastName).toBe(item.lastName);
	});

	test('Valid input #5', async () => {
		const repository = getRepository(Consumer);
		const item = await repository.save({
			firstName: 'First Name',
			lastName: 'Last Name',
			sessionId: '3ae1864e-e746-40c0-9d2e-58825c161418',
		});

		const params: UpdateParams = {
			id: item.id,
			lastName: 'Updated Last Name',
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.sessionId).toBe(item.sessionId);
		expect(updated.firstName).toBe(item.firstName);
		expect(updated.lastName).toBe(params.lastName);
	});

	test('Invalid input #1', async () => {
		const repository = getRepository(Consumer);
		const item = await repository.save({
			firstName: 'First Name',
			lastName: 'Last Name',
			sessionId: '3ae1864e-e746-40c0-9d2e-58825c161418',
		});

		const params = {
			firstName: 'First Name',
			id: item.id,
			lastName: 'Last Name',
			sessionId: 42,
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		const repository = getRepository(Consumer);
		const item = await repository.save({
			firstName: 'First Name',
			lastName: 'Last Name',
			sessionId: '3ae1864e-e746-40c0-9d2e-58825c161418',
		});

		const params = {
			firstName: 42,
			id: item.id,
			lastName: 'Last Name',
			sessionId: '3ae1864e-e746-40c0-9d2e-58825c161418',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		const repository = getRepository(Consumer);
		const item = await repository.save({
			firstName: 'First Name',
			lastName: 'Last Name',
			sessionId: '3ae1864e-e746-40c0-9d2e-58825c161418',
		});

		const params = {
			firstName: 'First Name',
			id: item.id,
			lastName: 42,
			sessionId: '3ae1864e-e746-40c0-9d2e-58825c161418',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});
});
