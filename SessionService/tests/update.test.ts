import SessionController from '@controller/SessionController';
import { Session } from '@entities/Session';
import SessionValidation from '@validation/SessionValidation';
import { Response } from 'jest-express/lib/response';
import { resolve } from 'path';
import { createConnection, getConnection, getRepository } from 'typeorm';
import UpdateParams from '../src/interfaces/UpdateParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';

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
			dropSchema: true,
			entities: [resolve(__dirname, '../src/entity/**/*.ts')],
			logging: false,
			schema: 'update',
			synchronize: true,
			type: 'postgres',
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-sessions-test',
		});
	});

	afterAll(() => {
		return getConnection().close();
	});

	test('Valid input #1', async () => {
		const repository = getRepository(Session);
		const item = await repository.save({
			adminId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			description: 'Description before testing',
			title: 'Update session testing',
		});

		const params: UpdateParams = {
			adminId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			description: 'Testing session detailed description',
			id: item.id,
			title: 'Testing session title',
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
			description: 'Description before testing',
			title: 'Update session testing',
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
			description: 'Description before testing',
			title: 'Update session testing',
		});

		const params: UpdateParams = {
			adminId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			id: item.id,
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
			description: 'Description before testing',
			title: 'Update session testing',
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
			description: 'Description before testing',
			title: 'Update session testing',
		});

		const params: UpdateParams = {
			description: 'Testing session detailed description',
			id: item.id,
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
			description: 'Description before testing',
			title: 'Update session testing',
		});

		const params: UpdateParams = {
			description: null,
			id: item.id,
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
			description: 'Description before testing',
			title: 'Update session testing',
		});

		const params = {
			adminId: 42,
			description: 'Testing session detailed description',
			id: item.id,
			title: 'Testing session title',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		const repository = getRepository(Session);
		const item = await repository.save({
			adminId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			description: 'Description before testing',
			title: 'Update session testing',
		});

		const params = {
			adminId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			description: 'Testing session detailed description',
			id: item.id,
			title: 42,
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		const repository = getRepository(Session);
		const item = await repository.save({
			adminId: '3ae1864e-e746-40c0-9d2e-58825c161418',
			description: 'Description before testing',
			title: 'Update session testing',
		});

		const params = {
			adminId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			description: 42,
			id: item.id,
			title: 'Testing session title',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});
});
