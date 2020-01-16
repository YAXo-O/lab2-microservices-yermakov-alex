/**
 * @typedef CreateParams
 * @property {string} title.required - Session title
 * @property {string} [description] - Session detailed description
 */
export default interface CreateParams {
	title: string;
	description?: string;
}
