/**
 * @typedef DeleteParams
 * @property {string} id.required - Consumer id uuid v4 string
 * @property {boolean} [bySession] - If true, passed id is session id, otherwise - consumer id
 */
export default interface DeleteParams {
	id: string;
	bySession?: boolean;
}
