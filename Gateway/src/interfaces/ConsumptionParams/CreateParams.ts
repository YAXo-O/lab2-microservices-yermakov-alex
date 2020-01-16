/**
 * @typedef CreateParams
 * @property {string} consumerId.required - Consumption consumer uuid v4 string
 * @property {integer} cost.required - Consumption cost
 * @property {string} description.required - Consumption description
 * @property {string} eventId.required - Consumption event uuid v4 string
 */
export default interface CreateParams {
	consumerId: string;
	cost: number;
	description: string;
	eventId: string;
}
