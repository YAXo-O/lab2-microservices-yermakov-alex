/**
 * @typedef CreateParams
 * @property {string} eventId.required - Consumption event uuid v4 string
 * @property {string} consumerId.required - Consumption consumer uuid v4 string
 * @property {string} description.required - Consumption description
 * @property {integer} cost.required - Consumption cost
 */
export default interface CreateParams {
	consumerId: string;
	cost: number;
	description: string;
	eventId: string;
}
