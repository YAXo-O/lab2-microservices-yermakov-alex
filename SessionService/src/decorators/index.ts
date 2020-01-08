import { Response } from 'express';
import { Request } from 'express-serve-static-core';
import { validationResult } from 'express-validator';
import { logger } from '../logger';

export function validate(target: any, propKey: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;

	descriptor.value = async (request: Request, response: Response) => {
		const validation = validationResult(request);
		if (validation.isEmpty()) {
			logger.info(`Calling method ${propKey}. Validation is successful.`);
			await originalMethod(request, response);
		} else {
			const errors = validation.array().map(e => e.msg);
			logger.info(`Refusing to call ${propKey}. Validation errors: `, errors);

			response.status(400).json({error: errors});
		}
	};
}
