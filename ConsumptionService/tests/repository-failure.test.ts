import ConsumptionController from '@controller/ConsumptionController';
import ConsumptionValidation from '@validation/ConsumptionValidation';
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
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			cost: 250,
			description: 'Test consumption',
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		};
		const { request, response } = prepareDataMocks(url, body, {}, 'POST');
		await executeValidation(request, response, ConsumptionValidation.create());
		await ConsumptionController.create(request as any, response as any);

		expect(response.status).toBeCalledWith(500);
	});

	test('Get test', async () => {
		const query: GetParams = {
			id: '177bd7ca-e4cf-48c3-80f7-39f1a1465ea5',
		};
		const { request, response } = prepareDataMocks(url, {}, query, 'GET');
		await executeValidation(request, response, ConsumptionValidation.get());
		await ConsumptionController.get(request as any, response as any);

		expect(response.status).toBeCalledWith(500);
	});

	test('Update test', async () => {
		const body: UpdateParams = {
			consumerId: '981339a7-3fcd-486f-84ae-cf3da1c2ecf1',
			cost: 250,
			description: 'Test consumption',
			eventId: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
			id: '8c10c34d-0413-445d-8cb2-36d8d7b3ba39',
		};
		const { request, response } = prepareDataMocks(url, body, {}, 'PATCH');
		await executeValidation(request, response, ConsumptionValidation.update());
		await ConsumptionController.update(request as any, response as any);

		expect(response.status).toBeCalledWith(500);
	});

	test('Delete test', async () => {
		const query: DeleteParams = {
			id: '177bd7ca-e4cf-48c3-80f7-39f1a1465ea5',
		};
		const { request, response } = prepareDataMocks(url, {}, query, 'DELETE');
		await executeValidation(request, response, ConsumptionValidation.delete());
		await ConsumptionController.delete(request as any, response as any);

		expect(response.status).toBeCalledWith(500);
	});
});
