import EventController from '@controller/EventController';
import EventValidation from '@validation/EventValidation';
import { Response } from 'jest-express/lib/response';
import { resolve } from 'path';
import { createConnection, getConnection } from 'typeorm';
import CreateParams from '../src/interfaces/CreateParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'POST');
	await executeValidation(request, response, EventValidation.create());
	await EventController.create(request as any, response as any);

	return response;
}

// Turn off logging for testing
logger.silent = true;

describe('Create Event tests', () => {
	beforeAll(() => {
		return createConnection({
			dropSchema: true,
			entities: [resolve(__dirname, '../src/entity/**/*.ts')],
			logging: false,
			schema: 'create',
			synchronize: true,
			type: 'postgres',
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-events-test',
		});
	});

	afterAll(() => {
		return getConnection().close();
	});

	test('Valid input #1', async () => {
		const params: CreateParams = {
			investorId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(201);
		expect(response.json).toBeCalledWith(expect.objectContaining(params));
	});

	test('Invalid input #1', async () => {
		const params: CreateParams = {
			investorId: '9d168bbf-d67f-4730-8d33',
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #2', async () => {
		const params: CreateParams = {
			investorId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			sessionId: '9d168bbf-d67f-4730-8d33',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #3', async () => {
		const params = {
			investorId: 42,
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #4', async () => {
		const params = {
			investorId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			sessionId: 42,
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #5', async () => {
		const params = {
			investorId: '9d168bbf-d67f-4730-8d33',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #6', async () => {
		const params = {
			sessionId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid input #7', async () => {
		const params = {
			investorId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});
});
