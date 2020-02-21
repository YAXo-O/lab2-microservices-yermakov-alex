/**
 * @typedef CreateParams
 * @property {string} login.required - User login
 * @property {string} hash.required - User hash
 */
export default interface CreateParams {
	login: string;
	password: string;
}
