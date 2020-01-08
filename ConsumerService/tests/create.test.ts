import ConsumerController from '@controller/ConsumerController';
import ConsumerValidation from '@validation/ConsumerValidation';
import { Response } from 'jest-express/lib/response';
import { resolve } from 'path';
import { createConnection, getConnection } from 'typeorm';
import CreateParams from '../src/interfaces/CreateParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'POST');
	await executeValidation(request, response, ConsumerValidation.create());
	await ConsumerController.create(request as any, response as any);

	return response;
}

// Turn off logging for testing
logger.silent = true;

describe('Create Consumer tests', () => {
	beforeAll(() => {
		return createConnection({
			dropSchema: true,
			entities: [resolve(__dirname, '../src/entity/**/*.ts')],
			logging: false,
			schema: 'create',
			synchronize: true,
			type: 'postgres',
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-consumers-test',
		});
	});

	afterAll(() => {
		return getConnection().close();
	});

	test('Valid input #1', async () => {
		const params: CreateParams = {
			firstName: 'Test First Name',
			lastName: 'Test Last Name',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(201);
		expect(response.json).toBeCalledWith(expect.objectContaining(params));
	});

	test('Invalid session id #1', async () => {
		const params: CreateParams = {
			firstName: 'Test First Name',
			lastName: 'Test Last Name',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid session id #2', async () => {
		const params = {
			firstName: 'Test First Name',
			lastName: 'Test Last Name',
			sessionId: 141,
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid session id #3', async () => {
		const params = {
			firstName: 'Test First Name',
			lastName: 'Test Last Name',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid first name #1', async () => {
		const params = {
			firstName: 42,
			lastName: 'Test Last Name',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid first name #2', async () => {
		const params = {
			lastName: 'Test Last Name',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid last name #1', async () => {
		const params = {
			firstName: 'Test First Name',
			lastName: 42,
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid last name #1', async () => {
		const params = {
			firstName: 'Test First Name',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});
});
