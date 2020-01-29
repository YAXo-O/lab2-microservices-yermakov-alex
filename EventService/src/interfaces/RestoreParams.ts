/**
 * @typedef RestoreParams
 * @property {string} id.required - Event uuid v4 string
 * @property {string} title.required - Current event's title
 * @property {string} investorId.required - Current event's investor
 * @property {string} sessionId.required - Session current event belongs to
 * @property {number} dateCreated.required - Date current event was created on
 */
export default interface RestoreParams {
	id: string;
	title: string;
	investorId: string;
	sessionId: string;
	dateCreated: number;
}