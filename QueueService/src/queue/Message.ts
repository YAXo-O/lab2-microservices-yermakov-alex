export default interface Message {
	host: string;
	endpoint: string;
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	pending: boolean;
	query: object;
	body: object;
}
