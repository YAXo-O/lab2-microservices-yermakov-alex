import { Request } from 'express';

export default interface BaseRequest<T = {}, Q = {}> extends Request {
	body: T;
	query: Q;
}
