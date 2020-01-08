/**
 * @typedef UpdateParams
 * @property {string} id.required - Id (uuid v4 string) of event to be updated
 * @property {string} [sessionId] - New event session id (uuid v4 string) value
 * @property {string} [investorId] - New event investor id (uuid v4 string) value
 */
export default interface UpdateParams {
	id: string;
	sessionId?: string;
	investorId?: string;
}
