/**
 * @typedef DeleteParams
 * @property {string} id.required - Event id uuid v4 string
 * @property {boolean} [bySession] - If true, passed id is session id, otherwise - event id
 */
export default interface DeleteParams {
	id: string;
	bySession?: boolean;
}
