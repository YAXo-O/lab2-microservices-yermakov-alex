import { body, query } from 'express-validator';

export default class EventValidation {
	public static create() {
		return [
			body('title', 'Event title is required').exists().isString(),
			body('investorId', 'Investor id should be a uuid v4 string').exists().isUUID(4),
			body('sessionId', 'Session id should be a uuid v4 string').exists().isUUID(4),
		];
	}

	public static get() {
		return [
			query('id', 'Id should be a uuid v4 string').optional().isUUID(4),
			query('page', 'Page should be an integer').optional().isInt(),
			query('sessionId', 'Session id should be a uuid v4 string').optional().isUUID(4),
		];
	}

	public static update() {
		return [
			body('id', 'Id should be a uuid v4 string').exists().isUUID(4),
			body('title', 'Event title should be a string').optional().isString(),
			body('investorId', 'Investor Id should be a uuid v4 string').optional().isUUID(4),
			body('sessionId', 'Session Id should be a uuid v4 string').optional().isUUID(4),
		];
	}

	public static delete() {
		return [
			query('id', 'Id should be a uuid v4 string').exists().isUUID(4),
		];
	}
}
