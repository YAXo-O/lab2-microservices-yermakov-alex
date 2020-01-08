import { body, query } from 'express-validator';

export default class ConsumerValidation {
	public static create() {
		return [
			body('sessionId', 'Session id is required and should be uuid v4 string').exists().isUUID(4),
			body('firstName', 'First name is required string').exists().isString(),
			body('lastName', 'Last name is required string').exists().isString(),
		];
	}

	public static get() {
		return [
			query('page', 'Page is optional integer').optional().isInt(),
			query('id', 'Id is optional uuid v4 string').optional().isUUID(4),
		];
	}

	public static update() {
		return [
			body('id', 'Id is required uuid v4 string').exists().isUUID(4),
			body('sessionId', 'Session id is optional uuid v4 string').optional().isUUID(4),
			body('firstName', 'First Name is optional string').optional().isString(),
			body('lastName', 'Last Name is optional string or null').optional().isString(),
		];
	}

	public static delete() {
		return [
			query('id', 'Session id is required and should be uuid v4 string').exists().isUUID(4),
		];
	}
}
