/**
 * @typedef UpdateParams
 * @property {string} id.required - Id (uuid v4 string) of consumer to be updated
 * @property {string} [firstName] - New consumer first name value
 * @property {string} [lastName] - New consumer last name value
 */
export default interface UpdateParams {
	id: string;
	firstName?: string;
	lastName?: string;
}
