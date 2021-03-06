/**
 * @typedef GetParams
 * @property {number} [page = 0] - Page number (starting from 0). Each page contains of up to 20 users
 * @property {string} [id] - Id (uuid v4 string) of exact user to retrieve
 */
export default interface GetParams {
	id?: string;
	login?: string;
	page?: number;
}
