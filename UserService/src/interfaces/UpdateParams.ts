/**
 * @typedef UpdateParams
 * @property {string} id.required - Id (uuid v4 string) of user to be updated
 * @property {string} [login] - New user login
 * @property {string} [hash] - New user hash
 */
export default interface UpdateParams {
	id: string;
	login?: string;
	hash?: string;
}
