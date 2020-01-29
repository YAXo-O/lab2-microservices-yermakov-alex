export default interface EnqueueParams {
	host: string;
	endpoint: string;
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	query: object;
	body: object;
}
