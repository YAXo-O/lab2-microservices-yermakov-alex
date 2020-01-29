import { validate } from '@decorators/index';
import { Response } from 'express';
import fetch from 'node-fetch';
import BaseRequest from '../interfaces/BaseRequest';
import DequeueParams from '../interfaces/DequeueParams';
import EnqueueParams from '../interfaces/EnqueueParams';
import { logger } from '../logger';
import Queue from '../queue/Queue';

function formatURL(base: string, query: object): string {
	const keys = Object.keys(query).filter(k => query[k] !== undefined);

	if (keys.length === 0) {
		return base;
	}

	return keys.reduce((acc: string, key: string) => `${acc}${key}=${query[key]}&`, `${base}?`);
}

export default class QueueController {
	@validate
	public static async enqueue(request: BaseRequest<EnqueueParams>, response: Response) {
		logger.info('Enqueuing request', request.body);
		const body = request.body;

		await Queue.getInstance().enqueue({
			body: body.body,
			endpoint: body.endpoint,
			host: body.host,
			method: body.method,
			pending: false,
			query: body.query,
		});

		logger.info('Request enqueued');

		response.status(200).json({});
	}

	@validate
	public static async requestDequeue(request: BaseRequest<{}, DequeueParams>, response: Response) {
		const host = request.query.host;
		logger.info(`Calling dequeue for ${host}`);
		response.status(200).json({});

		const queue = Queue.getInstance();
		let msg = await queue.dequeue(host);
		let ok = true;
		while (msg && ok) {
			const url = formatURL(`${host}${msg.endpoint}`, msg.query);
			try {
				logger.info(`Sending request to: ${url} for message: `, msg);

				const resp = await fetch(`http://${url}`, {
					body: JSON.stringify(msg.body),
					method: msg.method,
				});

				if (resp.ok) {
					logger.info('Successfully fulfilled');
				} else {
					logger.info('Invalid data: ', resp.statusText);
				}

				await queue.release(msg);
				msg = await queue.dequeue(host);
			} catch (e) {
				logger.info(`Error while sending request to ${url}`, e);
				ok = false;
			}
		}
	}
}
