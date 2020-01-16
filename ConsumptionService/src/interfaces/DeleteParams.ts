/**
 * @typedef DeleteParams
 * @property {string} id.required - Consumption uuid v4 string
 * @property {boolean} [byEvent] - if true, deletes by event id, otherwise deletes by consumption id
 */
export default interface DeleteParams {
	id: string;
	byEvent?: boolean;
}
