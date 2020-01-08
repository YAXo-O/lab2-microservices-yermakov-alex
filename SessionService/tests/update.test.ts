import SessionController from '@controller/SessionController';
import { Session } from '@entities/Session';
import SessionValidation from '@validation/SessionValidation';
import { resolve } from 'path';
import { createConnection, getConnection, getRepository } from 'typeorm';
import UpdateParams from '../src/interfaces/UpdateParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';
import { Response } from 'jest-express/lib/response';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'PATCH');
	await executeValidation(request, response, SessionValidation.update());
	await SessionController.update(request as any, response as any);

	return response;
}

// Turn off logging for testing
logger.silent = true;

describe('Update Session tests', () => {
	beforeAll(() => {
		return createConnection({
			type: 'postgres',
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-sessions-test',
			schema: 'update',
			entities: [resolve(__dirname, '../src/entity/**/*.ts')],
			dropSchema: true,
			synchronize: true,
			logging: false,
		});
	});

	afterAll(() => {
		return getConnection().close();
	});

	test('Valid input #1', async () => {
		const repository = getRepository(Session);
		const item = await repository.save({
			adminId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			title: 'Update session testing',
			description: 'Description before testing',
		});

		const params: UpdateParams = {
			id: item.id,
			adminId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			title: 'Testing session title',
			description: 'Testing session detailed description'
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.adminId).toBe(params.adminId);
		expect(updated.title).toBe(params.title);
		expect(updated.description).toBe(params.description);
	});

	test('Valid input #2', async () => {
		const repository = getRepository(Session);
		const item = await repository.save({
			adminId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			title: 'Update session testing',
			description: 'Description before testing',
		});

		const params: UpdateParams = {
			id: item.id,
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.adminId).toBe(item.adminId);
		expect(updated.title).toBe(item.title);
		expect(updated.description).toBe(item.description);
	});

	test('Valid input #3', async () => {
		const repository = getRepository(Session);
		const item = await repository.save({
			adminId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			title: 'Update session testing',
			description: 'Description before testing',
		});

		const params: UpdateParams = {
			id: item.id,
			adminId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.adminId).toBe(params.adminId);
		expect(updated.title).toBe(item.title);
		expect(updated.description).toBe(item.description);
	});

	test('Valid input #4', async () => {
		const repository = getRepository(Session);
		const item = await repository.save({
			adminId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			title: 'Update session testing',
			description: 'Description before testing',
		});

		const params: UpdateParams = {
			id: item.id,
			title: 'Testing session title',
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.adminId).toBe(item.adminId);
		expect(updated.title).toBe(params.title);
		expect(updated.description).toBe(item.description);
	});

	test('Valid input #5', async () => {
		const repository = getRepository(Session);
		const item = await repository.save({
			adminId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			title: 'Update session testing',
			description: 'Description before testing',
		});

		const params: UpdateParams = {
			id: item.id,
			description: 'Testing session detailed description'
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.adminId).toBe(item.adminId);
		expect(updated.title).toBe(item.title);
		expect(updated.description).toBe(params.description);
	});

	test('Valid input #6', async () => {
		const repository = getRepository(Session);
		const item = await repository.save({
			adminId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			title: 'Update session testing',
			description: 'Description before testing',
		});

		const params: UpdateParams = {
			id: item.id,
			description: null
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.adminId).toBe(item.adminId);
		expect(updated.title).toBe(item.title);
		expect(updated.description).toBe(params.description);
	});

	test('Invalid input #1', async () => {
		const repository = getRepository(Session);
		const item = await repository.save({
			adminId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			title: 'Update session testing',
			description: 'Description before testing',
		});

		const params = {
			id: item.id,
			adminId: 42,
			title: 'Testing session title',
			description: 'Testing session detailed description'
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		const repository = getRepository(Session);
		const item = await repository.save({
			adminId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			title: 'Update session testing',
			description: 'Description before testing',
		});

		const params = {
			id: item.id,
			adminId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			title: 42,
			description: 'Testing session detailed description'
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		const repository = getRepository(Session);
		const item = await repository.save({
			adminId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			title: 'Update session testing',
			description: 'Description before testing',
		});

		const params = {
			id: item.id,
			adminId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			title: 'Testing session title',
			description: 42
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});
});