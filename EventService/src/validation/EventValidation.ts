import { body, query } from 'express-validator';

export default class EventValidation {
	public static create() {
		return [
			body('investorId', 'Investor id is required and should be uuid v4 string').exists().isUUID(4),
			body('sessionId', 'Session id is required and should be uuid v4 string').exists().isUUID(4),
		];
	}

	public static get() {
		return [
			query('page', 'Page is optional integer').optional().isInt(),
			query('id', 'Id is optional uuid v4 string').optional().isUUID(4),
			query('sessionId', 'Session id is optional uuid v4 string').optional().isUUID(4),
		];
	}

	public static update() {
		return [
			body('id', 'Id is required uuid v4 string').exists().isUUID(4),
			body('sessionId', 'Session id is optional uuid v4 string').optional().isUUID(4),
			body('investorId', 'Investor id is optional uuid v4 string').optional().isUUID(4),
		];
	}

	public static delete() {
		return [
			query('id', 'Event id is required and should be uuid v4 string').exists().isUUID(4),
			query('bySession', 'By session should be boolean').optional().isBoolean(),
		];
	}
}
