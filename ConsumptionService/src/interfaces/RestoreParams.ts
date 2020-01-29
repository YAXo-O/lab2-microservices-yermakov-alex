/**
 * @typedef RestoreParams
 * @property {string} id.required - Consumption uuid v4 string
 * @property {string} eventId.required - Event id consumption is connected to
 * @property {string} consumerId.required - Consumer of current consumption
 * @property {string} description.required - Description of current consumption
 * @property {number} cost.required - Cost of current consumption
 * @property {number} dateCreated.required - Date when consumption was created
 */
export default interface RestoreParams {
	id: string;
	eventId: string;
	consumerId: string;
	description: string;
	cost: number;
	dateCreated: number;
}
