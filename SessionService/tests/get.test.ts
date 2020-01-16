import SessionController from '@controller/SessionController';
import { Session } from '@entities/Session';
import SessionValidation from '@validation/SessionValidation';
import { Response } from 'jest-express/lib/response';
import { resolve } from 'path';
import { createConnection, getConnection, getRepository } from 'typeorm';
import GetParams from '../src/interfaces/GetParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';

async function callEndpoint(query: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, {}, query, 'GET');
	await executeValidation(request, response, SessionValidation.get());
	await SessionController.get(request as any, response as any);

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
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-sessions-test',
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
		const repository = getRepository(Session);
		const item = await repository.save({
			adminId: 'e77ab26b-4187-4710-a409-05ee81edb11c',
			title: 'Existing item test',
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
		expect(response.json).toBeCalledWith(null);
	});

	test('Invalid input #1', async () => {
		const query = {
			page: 'alpha',
		};

		const response = await callEndpoint(query);

		expect(response.status).toBeCalledWith(400);
	});
});
