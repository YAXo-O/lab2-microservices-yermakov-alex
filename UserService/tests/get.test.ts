import UserController from '@controller/UserController';
import { User } from '@entities/User';
import UserValidation from '@validation/UserValidation';
import { Response } from 'jest-express/lib/response';
import { resolve } from 'path';
import { createConnection, getConnection, getRepository } from 'typeorm';
import GetParams from '../src/interfaces/GetParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';

async function callEndpoint(query: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, {}, query, 'GET');
	await executeValidation(request, response, UserValidation.get());
	await UserController.get(request as any, response as any);

	return response;
}

// Turn off logging for testing
logger.silent = true;

describe('Get Users tests', () => {
	beforeAll(() => {
		return createConnection({
			dropSchema: true,
			entities: [resolve(__dirname, '../src/entity/**/*.ts')],
			logging: false,
			schema: 'get',
			synchronize: true,
			type: 'postgres',
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-users-test',
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
		const repository = getRepository(User);
		const item = await repository.save({
			hash: 'hash',
			login: 'login',
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
			id: '432a94a5-28aa-4d0e-9192',
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
