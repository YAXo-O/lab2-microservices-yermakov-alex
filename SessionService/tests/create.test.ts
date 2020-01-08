import SessionController from '@controller/SessionController';
import SessionValidation from '@validation/SessionValidation';
import { resolve } from 'path';
import { createConnection, getConnection } from 'typeorm';
import CreateParams from '../src/interfaces/CreateParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';
import { Response } from 'jest-express/lib/response';

async function callEndpoint(params: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, params, {}, 'POST');
	await executeValidation(request, response, SessionValidation.create());
	await SessionController.create(request as any, response as any);

	return response;
}

// Turn off logging for testing
logger.silent = true;

describe('Create Session tests', () => {
	beforeAll(() => {
		return createConnection({
			type: 'postgres',
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-sessions-test',
			schema: 'create',
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
		const params: CreateParams = {
			adminId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			title: 'Testing session title',
			description: 'Testing session detailed description'
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(201);
		expect(response.json).toBeCalledWith(expect.objectContaining(params));
	});

	test('Valid input #2', async () => {
		const params: CreateParams = {
			adminId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			title: 'Testing session title',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(201);
		expect(response.json).toBeCalledWith(expect.objectContaining(params));
	});

	test('Invalid admin id #1', async () => {
		const params: CreateParams = {
			adminId: '9d168bbf-d67f-4730-8d33',
			title: 'Testing session title',
			description: 'Testing session detailed description',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid admin id #2', async () => {
		const params = {
			adminId: 141,
			title: 'Testing session title',
			description: 'Testing session detailed description',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid admin id #2', async () => {
		const params = {
			title: 'Testing session title',
			description: 'Testing session detailed description',
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid title #1', async () => {
		const params = {
			adminId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			title: 42,
			description: 'Testing session detailed description'
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid title #2', async () => {
		const params = {
			adminId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			description: 'Testing session detailed description'
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});

	test('Invalid description', async () => {
		const params = {
			adminId: '9d168bbf-d67f-4730-8d33-818b90ea12a1',
			title: 'Testing session title',
			description: 42
		};

		const response = await callEndpoint(params);

		expect(response.status).toBeCalledWith(400);
	});
});