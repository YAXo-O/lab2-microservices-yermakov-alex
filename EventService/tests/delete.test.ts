import EventController from '@controller/EventController';
import { Event } from '@entities/Event';
import EventValidation from '@validation/EventValidation';
import { Response } from 'jest-express/lib/response';
import { resolve } from 'path';
import { createConnection, getConnection, getRepository } from 'typeorm';
import DeleteParams from '../src/interfaces/DeleteParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';

async function callEndpoint(query: object): Promise<Response> {
	const { request, response } = prepareDataMocks(url, {}, query, 'DELETE');
	await executeValidation(request, response, EventValidation.delete());
	await EventController.delete(request as any, response as any);

	return response;
}

// Turn off logging for testing
logger.silent = true;

describe('Delete Events tests', () => {
	beforeAll(() => {
		return createConnection({
			dropSchema: true,
			entities: [resolve(__dirname, '../src/entity/**/*.ts')],
			logging: false,
			schema: 'delete',
			synchronize: true,
			type: 'postgres',
			url: process.env.TEST_DATABASE_URL || 'postgres://test-runner:123456@localhost:5432/billing-events-test',
		});
	});

	afterAll(() => {
		return getConnection().close();
	});

	test('Valid input #1', async () => {
		const query: DeleteParams = {
			id: 'da949210-09f5-4352-8691-c4e625e28ed5',
		};

		const response = await callEndpoint(query);

		expect(response.status).toBeCalledWith(200);
	});

	test('Valid input #2', async () => {
		const repository = getRepository(Event);
		const item = await repository.save({
			investorId: '2f7ad383-8701-4a59-b9c4-de8ba2290659',
			sessionId: '2f7ad383-8701-4a59-b9c4-de8ba2290659',
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
			id: 42,
		};

		const response = await callEndpoint(query);

		expect(response.status).toBeCalledWith(400);
	});
});
