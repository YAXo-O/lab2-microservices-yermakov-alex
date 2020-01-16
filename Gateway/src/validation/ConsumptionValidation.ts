import { body, query } from 'express-validator';

export default class ConsumerValidation {
	public static create() {
		return [
			body('consumerId', 'Consumer id should be a uuid v4 string').exists().isUUID(4),
			body('cost', 'Cost should be an integer').exists().isInt(),
			body('description', 'Description should be a string').exists().isString(),
			body('eventId', 'Event id should be a uuid v4 string').exists().isUUID(4),
		];
	}

	public static get() {
		return [
			query('id', 'Id should be a uuid v4 string').optional().isUUID(4),
			query('page', 'Page should be an integer').optional().isInt(),
		];
	}

	public static update() {
		return [
			body('id', 'Id should be a uuid v4 string').exists().isUUID(4),
			body('consumerId', 'Consumer id should be a uuid v4 string').optional().isUUID(4),
			body('cost', 'Cost should be an integer').optional().isInt(),
			body('description', 'Description should be a string').optional().isString(),
			body('eventId', 'Event id should be a uuid v4 string').optional().isUUID(4),
		];
	}

	public static delete() {
		return [
			query('id', 'Id should be a uuid v4 string').exists().isUUID(4),
		];
	}
}
