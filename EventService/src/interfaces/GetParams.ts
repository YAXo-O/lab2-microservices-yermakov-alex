/**
 * @typedef GetParams
 * @property {string} [id] - Id (uuid v4 string) of exact event to retrieve
 * @property {number} [page = 0] - Page number (starting from 0). Each page contains up to 20 events
 * @property {string} [sessionId] - Id (uuid v4 string) of exact event to retrieve
 */
export default interface GetParams {
	id?: string;
	page?: number;
	sessionId?: string;
}
