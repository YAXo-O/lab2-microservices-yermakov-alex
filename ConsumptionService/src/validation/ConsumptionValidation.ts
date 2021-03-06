import { body, query } from 'express-validator';

export default class ConsumptionValidation {
	public static create() {
		return [
			body('consumerId', 'Consumer id is required and should be uuid v4 string').exists().isUUID(4),
			body('cost', 'Cost is required integer').exists().isInt(),
			body('description', 'Description is required string').exists().isString(),
			body('eventId', 'Event id is required and should be uuid v4 string').exists().isUUID(4),
		];
	}

	public static get() {
		return [
			query('page', 'Page is optional integer').optional().isInt(),
			query('id', 'Id is optional uuid v4 string').optional().isUUID(4),
			body('eventId', 'Event id should be uuid v4 string').optional().isUUID(4),
		];
	}

	public static update() {
		return [
			body('id', 'Id is required uuid v4 string').exists().isUUID(4),
			body('consumerId', 'Consumer id is uuid v4 string').optional().isUUID(4),
			body('eventId', 'Event id is uuid v4 string').optional().isUUID(4),
			body('cost', 'Cost is integer').optional().isInt(),
			body('description', 'Description is string').optional().isString(),
		];
	}

	public static delete() {
		return [
			query('id', 'Session id is required and should be uuid v4 string').exists().isUUID(4),
			query('byEvent', 'By event is boolean').optional().isBoolean(),
		];
	}

	public static restore() {
		return [
			body('id', 'Id is a required uuid v4 string').exists().isUUID(4),
			body('eventId', 'Event id is a required uuid v4 string').exists().isUUID(4),
			body('consumerId', 'Consumer id is a required uuid v4 string').exists().isUUID(4),
			body('description', 'Description is a required string').exists().isString(),
			body('cost', 'Cost is a required integer').exists().isInt(),
			body('dateCreated', 'Date created is a required numeric').exists().isNumeric(),
		];
	}

	public static token() {
		return [
			query('appId', 'AppId is a required string').exists().isString(),
			query('appSecret', 'AppSecret is a required string').exists().isString(),
		];
	}
}
