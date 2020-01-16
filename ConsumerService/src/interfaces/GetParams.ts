/**
 * @typedef GetParams
 * @property {string} [id] - Id (uuid v4 string) of exact consumer to retrieve
 * @property {number} [page = 0] - Page number (starting from 0). Each page contains of up to 20 consumers
 * @property {string} [sessionId] - Session Id (uuid v4 string) of consumers to retrieve
 */
export default interface GetParams {
	id?: string;
	page?: number;
	sessionId?: string;
}
