import fetch from 'node-fetch';
import { logger } from '../../../UserService/src/logger';

function formatUrl(url: string, query: object): string {
	const result = Object.keys(query)
		.filter(key => query[key] !== undefined)
		.reduce((acc: string, cur: string) => `${acc}&${cur}=${query[cur]}`, `${url}?`);

	logger.info(`Formatted request url: ${result}`);

	return result;
}

export function post<T>(url: string, body: object, token: string = ''): Promise<T> {
	logger.info(`Post request to ${url} with `, body);
	return fetch(url, {
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Enclosed-Token': token,
		},
		method: 'POST',
	})
		.catch(e => {
			logger.info('Received an error while processing fetch', e);

			if (e.code) {
				throw e;
			} else {
				throw {
					reason: e,
					unreachable: true,
				};
			}
		})
		.then((resp) => {
			if (resp.ok) {
				logger.info(`Post request to ${url} has been successful; Parsing json`);

				return resp.json && resp.json() || null;
			} else {
				if (resp.status >= 300 && resp.status < 400) {
					logger.info(`Redirecting; Code ${resp.status}; Status text ${resp.statusText}`);

					throw {
						code: resp.status,
						reason: 'Redirection',
						redirection: true,
						unreachable: false,
					};
				}

				logger.info(`Post request to ${url} return error ${resp.statusText}`);
				throw {
					code: resp.status,
					reason: resp.statusText,
				};
			}
		})
		.then((json) => {
			logger.info(`Parsed json from ${url}: `, json);

			return json;
		});
}

export function get<T>(url: string, query: object, token: string = ''): Promise<T> {
	logger.info(`Get request to ${url} with `, query);

	return fetch(formatUrl(url, query), {
		headers: {
			'Enclosed-Token': token,
		},
		method: 'GET',
	})
		.catch(e => {
			logger.info('Received an error while processing fetch', e);

			if (e.code) {
				throw e;
			} else {
				throw {
					reason: e,
					unreachable: true,
				};
			}
		})
		.then((resp) => {
			if (resp.ok) {
				logger.info(`Get request to ${url} has been successful. Parsing json`);

				return resp.json && resp.json() || null;
			} else {
				if (resp.status >= 300 && resp.status < 400) {
					logger.info(`Redirecting; Code ${resp.status}; Status text ${resp.statusText}`);

					throw {
						code: resp.status,
						reason: 'Redirection',
						redirection: true,
						unreachable: false,
					};
				}

				logger.info(`Get request to ${url} return error ${resp.statusText}`);
				throw {
					code: resp.status,
					reason: resp.statusText,
				};
			}
		})
		.then((json) => {
			logger.info(`Parsed json from ${url}: `, json);

			return json;
		});
}

export function update(url: string, body: object, token: string = ''): Promise<void> {
	logger.info(`Patch request to ${url} with `, body);
	return fetch(url, {
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Enclosed-Token': token,
		},
		method: 'PATCH',
	})
		.catch(e => {
			logger.info('Received an error while processing fetch', e);

			if (e.code) {
				throw e;
			} else {
				throw {
					reason: e,
					unreachable: true,
				};
			}
		})
		.then((resp) => {
			if (resp.ok) {
				logger.info(`Patch request to ${url} has been successful.`);
			} else {
				if (resp.status >= 300 && resp.status < 400) {
					logger.info(`Redirecting; Code ${resp.status}; Status text ${resp.statusText}`);

					throw {
						code: resp.status,
						reason: 'Redirection',
						redirection: true,
						unreachable: false,
					};
				}

				logger.info(`Patch request to ${url} return error ${resp.statusText}`);
				throw {
					code: resp.status,
					reason: resp.statusText,
				};
			}
		});
}

export function remove(url: string, query: object, token: string = ''): Promise<void> {
	logger.info(`Delete request to ${url} with `, query);
	return fetch(formatUrl(url, query), {
		headers: {
			'Enclosed-Token': token,
		},
		method: 'DELETE',
	})
		.catch(e => {
			logger.info('Received an error while processing fetch', e);

			if (e.code) {
				throw e;
			} else {
				throw {
					reason: e,
					unreachable: true,
				};
			}
		})
		.then((resp) => {
			if (resp.ok) {
				logger.info(`Delete request to ${url} has been successful.`);
			} else {
				if (resp.status >= 300 && resp.status < 400) {
					logger.info(`Redirecting; Code ${resp.status}; Status text ${resp.statusText}`);

					throw {
						code: resp.status,
						reason: 'Redirection',
						redirection: true,
						unreachable: false,
					};
				}

				logger.info(`Delete request to ${url} return error ${resp.statusText}`);
				throw {
					code: resp.status,
					reason: resp.statusText,
				};
			}
		});
	}

export function restore(url: string, body: object, token: string = ''): Promise<void> {
	logger.info(`Put request to ${url} with `, body);
	return fetch(url, {
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Enclosed-Token': token,
		},
		method: 'PUT',
	})
		.catch(e => {
			logger.info('Received an error while processing fetch', e);

			if (e.code) {
				throw e;
			} else {
				throw {
					reason: e,
					unreachable: true,
				};
			}
		})
		.then((resp) => {
			if (resp.ok) {
				logger.info(`Put request to ${url} has been successful.`);
			} else {
				if (resp.status >= 300 && resp.status < 400) {
					logger.info(`Redirecting; Code ${resp.status}; Status text ${resp.statusText}`);

					throw {
						code: resp.status,
						reason: 'Redirection',
						redirection: true,
						unreachable: false,
					};
				}

				logger.info(`Put request to ${url} return error ${resp.statusText}`);
				throw {
					code: resp.status,
					reason: resp.statusText,
				};
			}
		});
}
