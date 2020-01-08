import SessionController from '@controller/SessionController';
import SessionValidation from '@validation/SessionValidation';
import CreateParams from '../src/interfaces/CreateParams';
import DeleteParams from '../src/interfaces/DeleteParams';
import GetParams from '../src/interfaces/GetParams';
import UpdateParams from '../src/interfaces/UpdateParams';
import { logger } from '../src/logger';
import { executeValidation, prepareDataMocks, url } from './utils';

// Turn off logging for testing
logger.silent = true;

describe('Repository failure session tests', () => {
	test('Create test', async () => {
		const body: CreateParams = {
			adminId: '177bd7ca-e4cf-48c3-80f7-39f1a1465ea5',
			title: 'Repository failure create session test',
		};
		const { request, response } = prepareDataMocks(url, body, {}, 'POST');
		await executeValidation(request, response, SessionValidation.create());
		await SessionController.create(request as any, response as any);

		expect(response.status).toBeCalledWith(500);
	});

	test('Get test', async () => {
		const query: GetParams = {
			id: '177bd7ca-e4cf-48c3-80f7-39f1a1465ea5',
		};
		const { request, response } = prepareDataMocks(url, {}, query, 'GET');
		await executeValidation(request, response, SessionValidation.get());
		await SessionController.get(request as any, response as any);

		expect(response.status).toBeCalledWith(500);
	});

	test('Update test', async () => {
		const body: UpdateParams = {
			adminId: '177bd7ca-e4cf-48c3-80f7-39f1a1465ea5',
			id: '177bd7ca-e4cf-48c3-80f7-39f1a1465ea5',
		};
		const { request, response } = prepareDataMocks(url, body, {}, 'PATCH');
		await executeValidation(request, response, SessionValidation.update());
		await SessionController.update(request as any, response as any);

		expect(response.status).toBeCalledWith(500);
	});

	test('Delete test', async () => {
		const query: DeleteParams = {
			id: '177bd7ca-e4cf-48c3-80f7-39f1a1465ea5',
		};
		const { request, response } = prepareDataMocks(url, {}, query, 'DELETE');
		await executeValidation(request, response, SessionValidation.delete());
		await SessionController.delete(request as any, response as any);

		expect(response.status).toBeCalledWith(500);
	});
});
