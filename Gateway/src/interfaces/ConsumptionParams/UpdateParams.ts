/**
 * @typedef UpdateParams
 * @property {string} id.required - Id (uuid v4 string) of session to be updated
 * @property {string} [consumerId] - New consumption consumer id (uuid v4 string) value
 * @property {string} [eventId] - New consumption event id (uuid v4 string) value
 * @property {string} [description] - New consumption description
 * @property {integer} [cost] - New consumption cost
 */
export default interface UpdateParams {
	consumerId?: string;
	cost?: number;
	description?: string;
	eventId?: string;
	id: string;
}
