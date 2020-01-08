/**
 * @typedef PageResponse - Page with list of requested items of type T
 * @property {integer} page - Current page number
 * @property {integer} totalCount - Total number of items stored
 * @property {integer} totalPage - Total number of pages
 * @property {Array.<object>} items - Array of requested items (up to 20 items per page)
 */
export default interface PageResponse<T> {
	page: number;
	totalCount: number;
	totalPages: number;
	items: T[];
}
