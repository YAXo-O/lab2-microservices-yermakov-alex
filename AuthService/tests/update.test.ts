import AuthController from '@controller/UserController';
import { AuthSession } from '@entities/User';
import AuthValidation from '@validation/UserValidation';
import { Response } from 'jest-express/lib/response';
import { resolve } from 'path';
import { createConnection, getConnection, getRepository } from 'typeorm';
import UpdateParams from '../src/interfaces/UpdateParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'PATCH');
	await executeValidation(request, response, AuthValidation.update());
	await AuthController.update(request as any, response as any);

	return response;
}

// Turn off logging for testing
logger.silent = true;

describe('Update User tests', () => {
	beforeAll(() => {
		return createConnection({
			dropSchema: true,
			entities: [resolve(__dirname, '../src/entity/**/*.ts')],
			logging: false,
			schema: 'update',
			synchronize: true,
			type: 'postgres',
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-users-test',
		});
	});

	afterAll(() => {
		return getConnection().close();
	});

	test('Valid input #1', async () => {
		const repository = getRepository(AuthSession);
		const item = await repository.save({
			hash: 'hash',
			login: 'login',
		});

		const params: UpdateParams = {
			hash: 'updated hash',
			id: item.id,
			login: 'updated login',
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.hash).toBe(params.hash);
		expect(updated.login).toBe(params.login);
	});

	test('Valid input #2', async () => {
		const repository = getRepository(AuthSession);
		const item = await repository.save({
			hash: 'hash',
			login: 'login',
		});

		const params: UpdateParams = {
			hash: 'updated hash',
			id: item.id,
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.hash).toBe(params.hash);
		expect(updated.login).toBe(item.login);
	});

	test('Valid input #3', async () => {
		const repository = getRepository(AuthSession);
		const item = await repository.save({
			hash: 'hash',
			login: 'login',
		});

		const params: UpdateParams = {
			id: item.id,
			login: 'updated login',
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.hash).toBe(item.hash);
		expect(updated.login).toBe(params.login);
	});

	test('Valid input #4', async () => {
		const repository = getRepository(AuthSession);
		const item = await repository.save({
			hash: 'hash',
			login: 'login',
		});

		const params: UpdateParams = {
			id: item.id,
		};

		const response = await callEndpoint(params);

		const updated = await repository.findOne(item.id);

		expect(response.status).toBeCalledWith(200);
		expect(updated.hash).toBe(item.hash);
		expect(updated.login).toBe(item.login);
	});

	test('Invalid input #1', async () => {
		const params = {
			hash: 42,
			id: '432a94a5-28aa-4d0e-9192-946a2144f1f2',
			login: 'updated login',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		const params = {
			hash: 'updated hash',
			id: '432a94a5-28aa-4d0e-9192-946a2144f1f2',
			login: 42,
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		const params = {
			hash: 'updated hash',
			id: '432a94a5-28aa-4d0e-9192',
			login: 'updated login',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #4', async () => {
		const params = {
			hash: 'updated hash',
			id: 42,
			login: 'updated login',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #5', async () => {
		const params = {
			hash: 'updated hash',
			login: 'updated login',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});
});
