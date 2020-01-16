import { body } from 'express-validator';

export default class UserValidation {
	public static register() {
		return [
			body('login', 'Login should be a string').exists().isString(),
			body('password', 'Password should be a string').exists().isString(),
		];
	}
}
