/**
 * @typedef GetParams
 * @property {number} [page = 0] - Page number (starting from 0). Each page contains of up to 20 consumers
 * @property {string} [id] - Id (uuid v4 string) of exact consumer to retrieve
 */
export default interface GetParams {
	page?: number;
	id?: string;
}
