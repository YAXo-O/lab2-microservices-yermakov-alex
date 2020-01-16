import fetch from 'node-fetch';
import { logger } from '../../../UserService/src/logger';

function formatUrl(url: string, query: object): string {
	const result = Object.keys(query)
		.filter(key => query[key] !== undefined)
		.reduce((acc: string, cur: string) => `${acc}&${cur}=${query[cur]}`, `${url}?`);

	logger.info(`Formatted request url: ${result}`);

	return result;
}

export function post<T>(url: string, body: object): Promise<T> {
	logger.info(`Post request to ${url} with `, body);
	return fetch(url, {
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
	})
		.then((resp) => {
			if (resp.ok) {
				logger.info(`Post request to ${url} has been successful; Parsing json`);

				return resp.json();
			} else {
				logger.info(`Post request to ${url} return error ${resp.statusText}`);
				throw {
					reason: resp.statusText,
				};
			}
		})
		.then((json) => {
			logger.info(`Parsed json from ${url}: `, json);

			return json;
		});
}

export function get<T>(url: string, query: object): Promise<T> {
	logger.info(`Get request to ${url} with `, query);
	return fetch(formatUrl(url, query), {
		method: 'GET',
	})
		.then((resp) => {
			if (resp.ok) {
				logger.info(`Get request to ${url} has been successful. Parsing json`);

				return resp.json();
			} else {
				logger.info(`Get request to ${url} return error ${resp.statusText}`);
				throw {
					reason: resp.statusText,
				};
			}
		})
		.then((json) => {
			logger.info(`Parsed json from ${url}: `, json);

			return json;
		});
}

export function update(url: string, body: object): Promise<void> {
	logger.info(`Patch request to ${url} with `, body);
	return fetch(url, {
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
		method: 'PATCH',
	})
		.then((resp) => {
			if (resp.ok) {
				logger.info(`Patch request to ${url} has been successful; Parsing json`);

				return;
			} else {
				logger.info(`Patch request to ${url} return error ${resp.statusText}`);
				throw {
					reason: resp.statusText,
				};
			}
		});
}

export function remove(url: string, query: object): Promise<void> {
	logger.info(`Delete request to ${url} with `, query);
	return fetch(formatUrl(url, query), {
		method: 'DELETE',
	})
		.then((resp) => {
			if (resp.ok) {
				logger.info(`Delete request to ${url} has been successful. Parsing json`);
			} else {
				logger.info(`Delete request to ${url} return error ${resp.statusText}`);
				throw {
					reason: resp.statusText,
				};
			}
		});
}
