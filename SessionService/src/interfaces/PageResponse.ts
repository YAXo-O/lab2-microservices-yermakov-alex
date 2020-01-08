export default interface PageResponse<T> {
	page: number;
	totalCount: number;
	totalPages: number;
	items: Array<T>;
};