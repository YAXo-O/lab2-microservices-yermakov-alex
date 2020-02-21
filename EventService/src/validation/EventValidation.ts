import { body, query } from 'express-validator';

export default class EventValidation {
	public static create() {
		return [
			body('title', 'Event title should be a string').exists().isString(),
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
			body('title', 'Title should be a string').optional().isString(),
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

	public static restore() {
		return [
			body('id', 'Id is required and should be uuid v4 string').exists().isUUID(4),
			body('title', 'Event title').exists().isString(),
			body('investorId', 'Investor id is required and should be uuid v4 string').exists().isUUID(4),
			body('sessionId', 'Session id is required and should be uuid v4 string').exists().isUUID(4),
			body('dateCreated', 'Date created should be number representing date in milis').exists().isNumeric()
		];
	}

	public static token() {
		return [
			query('appId', 'AppId is a required string').exists().isString(),
			query('appSecret', 'AppSecret is a required string').exists().isString(),
		];
	}
}
