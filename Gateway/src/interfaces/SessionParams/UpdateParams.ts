/**
 * @typedef UpdateParams
 * @property {string} id.required - Id (uuid v4 string) of session to be updated
 * @property {string} [title] - New session title value
 * @property {?string} [description] - New session description value
 */
export default interface UpdateParams {
	id: string;
	title?: string;
	description?: string | null;
}
