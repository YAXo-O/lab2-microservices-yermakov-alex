import { body, query } from 'express-validator';

export default class SessionValidation {
	static create() {
		return [
			body('adminId', 'Admin id is required and should be uuid v4 string').exists().isUUID(4),
			body('title', 'Title is required field').exists().isString(),
			body('description', 'Description is an optional string').optional({
				nullable: true
			}).isString(),
		];
	}

	static get() {
		return [
			query('page', 'Page is optional integer').optional().isInt(),
			query('id', 'Id is optional uuid v4 string').optional().isUUID(4),
		];
	}

	static update() {
		return [
			body('id', 'Id is required uuid v4 string').exists().isUUID(4),
			body('adminId', 'Admin id is optional uuid v4 string').optional().isUUID(4),
			body('title', 'Title is optional string').optional().isString(),
			body('description', 'Description is optional string or null').optional({
				nullable: true
			}).isString(),
		];
	}

	static delete() {
		return [
			query('id', 'Session id is required and should be uuid v4 string').exists().isUUID(4),
		]
	}
}