import { body, query } from 'express-validator';

export default class QueueValidation {
	public static enqueue() {
		return [
			body('host', 'Host is a required string').exists().isString(),
			body('endpoint', 'Endpoint is a required string').exists().isString(),
			body('method', 'Method is a required string').exists().isString()
				.isIn(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
			body('query', 'Query is a required object').exists(),
			body('body', 'Body is a required object').exists(),
		];
	}
}