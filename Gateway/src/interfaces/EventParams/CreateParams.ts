/**
 * @typedef CreateParams
 * @property {string} title.required - Event title
 * @property {string} investorId.required - Investor id uuid v4
 * @property {string} sessionId.required - Session id uuid v4
 */
export default interface CreateParams {
	title: string;
	investorId: string;
	sessionId: string;
}
