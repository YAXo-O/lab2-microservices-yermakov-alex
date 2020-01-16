/**
 * @typedef CreateParams
 * @property {string} investorId.required - Investor id uuid v4
 * @property {string} sessionId.required - Session id uuid v4
 */
export default interface CreateParams {
	investorId: string;
	sessionId: string;
}
