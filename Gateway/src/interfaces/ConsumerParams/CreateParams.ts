/**
 * @typedef CreateParams
 * @property {string} sessionId.required - Session id (uuid v4 string) to add consumer to
 * @property {string} firstName.required - Consumer first name
 * @property {string} lastName.required - Consumer last name
 */
export default interface CreateParams {
	sessionId: string;
	firstName: string;
	lastName: string;
}
