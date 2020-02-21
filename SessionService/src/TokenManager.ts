import * as crypto from 'crypto';
import { logger } from './logger';

export default class TokenManager {
	public static createToken() {
		const cipher = crypto.createCipheriv(TokenManager.algo, TokenManager.key, TokenManager.iv);
		const time = `${+(new Date()) + this.tokenLifetime}`;
		logger.info(`Token lifetime till ${time}`);
		const token = cipher.update(Buffer.from(time));

		return Buffer.concat([token, cipher.final()]).toString('hex');
	}

	public static validateToken(token): boolean {
		const decipher = crypto.createDecipheriv(TokenManager.algo, TokenManager.key, TokenManager.iv);
		const buffer = decipher.update(Buffer.from(token, 'hex'));
		const time = Buffer.concat([buffer, decipher.final()]);
		logger.info(`Decrypted token lifetime till ${time}`);

		return new Date(+time) > new Date();
	}

	private static readonly tokenLifetime = 30 * 60 * 1000; // 30 minutes
	private static readonly algo = 'aes-256-cbc';
	private static readonly key = Buffer.from(crypto.randomBytes(32));
	private static readonly iv = crypto.randomBytes(16);
}
