import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';

export async function executeValidation(req, res, middlewares) {
	await Promise.all(middlewares.map(async (middleware) => {
		await middleware(req, res, () => undefined);
	}));
};

export function prepareDataMocks(url: string, body: object, query: object, method: 'POST' | 'GET' | 'PATCH' | 'DELETE'): {request: Request, response: Response} {
	const request = new Request(url, {
		method
	}) as any;
	request.body = body;
	request.query = query;

	return {request, response: new Response()};
}

export const url = '/api/private/v1/user';
