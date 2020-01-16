import { body, query } from 'express-validator';

export default class ConsumerValidation {
	public static create() {
		return [
			body('sessionId', 'Session id should be a uuid v4 string').exists().isUUID(4),
			body('firstName', 'First name should be a string').exists().isString(),
			body('lastName', 'Last name should be a string').exists().isString(),
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
			body('firstName', 'First name should be a string').optional().isString(),
			body('lastName', 'Last name should be a string').optional().isString(),
		];
	}

	public static delete() {
		return [
			query('id', 'Id should be a uuid v4 string').exists().isUUID(4),
		];
	}
}
