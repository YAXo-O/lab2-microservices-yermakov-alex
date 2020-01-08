/**
 * @typedef CreateParams
 * @property {string} adminId.required - Session admin uuid v4
 * @property {string} title.required - Session title
 * @property {string} [description] - Session detailed description
 */
export default interface CreateParams {
	adminId: string;
	title: string;
	description?: string;
}
