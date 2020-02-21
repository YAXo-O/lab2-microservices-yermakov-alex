import { body, query } from 'express-validator';

export default class UserValidation {
	public static create() {
		return [
			body('login', 'Login is a required string').exists().isString(),
			body('hash', 'Hash is a required field').exists().isString(),
		];
	}

	public static get() {
		return [
			query('page', 'Page is an optional integer').optional().isInt(),
			query('id', 'Id is an optional uuid v4 string').optional().isUUID(4),
			query('login', 'Login is an optional string').optional().isString(),
		];
	}

	public static update() {
		return [
			body('id', 'Id is a required uuid v4 string').exists().isUUID(4),
			body('login', 'Login is an optional uuid v4 string').optional().isString(),
			body('hash', 'Hash is an optional string').optional().isString(),
		];
	}

	public static delete() {
		return [
			query('id', 'Session id is required and should be uuid v4 string').exists().isUUID(4),
		];
	}

	public static token() {
		return [
			query('appId', 'AppId is a required string').exists().isString(),
			query('appSecret', 'AppSecret is a required string').exists().isString(),
		];
	}
}
