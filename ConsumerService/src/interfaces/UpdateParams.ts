/**
 * @typedef UpdateParams
 * @property {string} id.required - Id (uuid v4 string) of consumer to be updated
 * @property {string} [sessionId] - New consumer session id (uuid v4 string) value
 * @property {string} [firstName] - New consumer first name value
 * @property {?string} [lastName] - New consumer last name value
 */
export default interface UpdateParams {
	id: string;
	sessionId?: string;
	firstName?: string;
	lastName?: string;
}
