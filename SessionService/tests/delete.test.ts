import SessionController from '@controller/SessionController';
import { Session } from '@entities/Session';
import SessionValidation from '@validation/SessionValidation';
import { resolve } from 'path';
import { createConnection, getConnection, getRepository } from 'typeorm';
import DeleteParams from '../src/interfaces/DeleteParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';
import { Response } from 'jest-express/lib/response';

async function callEndpoint(query: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, {}, query, 'DELETE');
	await executeValidation(request, response, SessionValidation.delete());
	await SessionController.delete(request as any, response as any);

	return response;
}

// Turn off logging for testing
logger.silent = true;

describe('Get Sessions tests', () => {
	beforeAll(() => {
		return createConnection({
			type: 'postgres',
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-sessions-test',
			schema: 'delete',
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
		const query: DeleteParams = {
			id: 'da949210-09f5-4352-8691-c4e625e28ed5'
		};

		const response = await callEndpoint(query);

		expect(response.status).toBeCalledWith(200);
	});

	test('Valid input #2', async () => {
		const repository = getRepository(Session);
		const item = await repository.save({
			adminId: '2f7ad383-8701-4a59-b9c4-de8ba2290659',
			title: 'Session for deletion',
			description: 'This session is for delete option testing'
		});

		const query: DeleteParams = {
			id: item.id,
		};

		const response = await callEndpoint(query);

		const count = await repository.count({id: item.id});

		expect(response.status).toBeCalledWith(200);
		expect(count).toBe(0);
	});

	test('Invalid input #1', async () => {
		const query = {
			id: 42
		};

		const response = await callEndpoint(query);

		expect(response.status).toBeCalledWith(400);
	});
});