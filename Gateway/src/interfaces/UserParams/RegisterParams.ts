/**
 * @typedef RegisterParams - Params for registering new user
 * @property {string} login.required - User login
 * @property {string} password.required - User password
 */
export default interface RegisterParams {
	password: string;
	login: string;
}
