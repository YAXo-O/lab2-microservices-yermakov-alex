import UserController from '@controller/UserController';
import UserValidation from '@validation/UserValidation';
import { Response } from 'jest-express/lib/response';
import { resolve } from 'path';
import { createConnection, getConnection } from 'typeorm';
import CreateParams from '../src/interfaces/CreateParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'POST');
	await executeValidation(request, response, UserValidation.create());
	await UserController.create(request as any, response as any);

	return response;
}

// Turn off logging for testing
logger.silent = true;

describe('Create Users tests', () => {
	beforeAll(() => {
		return createConnection({
			dropSchema: true,
			entities: [resolve(__dirname, '../src/entity/**/*.ts')],
			logging: false,
			schema: 'create',
			synchronize: true,
			type: 'postgres',
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-users-test',
		});
	});

	afterAll(() => {
		return getConnection().close();
	});

	test('Valid input #1', async () => {
		const params: CreateParams = {
			hash: 'hash',
			login: 'test',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(201);
		expect(response.json).toBeCalledWith(expect.objectContaining(params));
	});

	test('Invalid admin id #1', async () => {
		const params = {
			hash: 'hash',
			login: 42,
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid admin id #2', async () => {
		const params = {
			hash: 'hash',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid admin id #3', async () => {
		const params = {
			hash: 42,
			login: 'login',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid admin id #4', async () => {
		const params = {
			login: 'login',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});
});
