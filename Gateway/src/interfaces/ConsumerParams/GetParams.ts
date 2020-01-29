/**
 * @typedef GetParams
 * @property {number} [page = 0] - Page number (starting from 0). Each page contains of up to 20 consumers
 * @property {string} [id] - Id (uuid v4 string) of exact consumer to retrieve
 * @property {string} [sessionId] - Session Id (uuid v4 string) of session which consumers to retrieve
 */
export default interface GetParams {
	sessionId?: string;
	page?: number;
	id?: string;
}
