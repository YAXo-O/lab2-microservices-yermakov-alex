import { body, query } from 'express-validator';

export default class AuthValidation {
	public static register() {
		return [
			body('login', 'Login is a required string').exists().isString(),
			body('password', 'Password is a required field').exists().isString(),
		];
	}

	public static getCode() {
		return [
			body('login', 'Login is a required string').exists().isString(),
			body('password', 'Password is a required field').exists().isString(),
			body('redirectUrl', 'Redirect Url is a required url').exists().isString(),
		];
	}

	public static getToken() {
		return [
			body('code', 'Code is a required string').exists().isString(),
		];
	}

	public static getUser() {
		return [
			body('token', 'Token is a required string').exists().isString(),
		];
	}

	public static refreshToken() {
		return [
			body('refreshToken', 'Refresh token is a required string').exists().isString(),
		];
	}
}
