/**
 * @typedef GetParams
 * @property {number} [page = 0] - Page number (starting from 0). Each page contains up to 20 events
 * @property {string} [id] - Id (uuid v4 string) of exact event to retrieve
 */
export default interface GetParams {
	page?: number;
	id?: string;
}
