import {Mutex} from 'async-mutex';
import { logger } from '../logger';

import Message from './Message';

export default class Queue {
	public static getInstance(): Queue {
		if (!this.instance) {
			this.instance = new Queue();
		}

		return this.instance;
	}

	private static instance?: Queue;
	private queue: Message[] = [];
	private lock: Mutex = new Mutex();

	protected constructor() {
	}

	public async enqueue(msg: Message) {
		const release = await this.lock.acquire();
		this.queue.push(msg);
		logger.info(`Queue size: ${this.queue.length}`);
		release();
		logger.info(`Enqueued: `, msg);
	}

	public async dequeue(host: string): Promise<Message | null> {
		const release = await this.lock.acquire();
		logger.info(`Dequeing for: ${host}`, this.queue);
		const msg = this.queue.find((m: Message) => !m.host.localeCompare(host) && !m.pending);
		if (msg) {
			msg.pending = true;
		}
		release();
		logger.info('Dequeued: ', msg);

		return msg;
	}

	public async release(msg: Message) {
		const release = await this.lock.acquire();
		const id = this.queue.findIndex(m => m === msg);

		if (id >= 0) {
			this.queue.splice(id, 1);
		}
		release();

		logger.info('Released: ', msg);
		logger.info(`Queue size: ${this.queue.length}`);
	}
}
