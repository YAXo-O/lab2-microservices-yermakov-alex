import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {User} from '../entity/User';

export default class UserController {

	private userRepository = getRepository(User);

	static async get(request: Request, response: Response) {
	}

	static async register(request: Request, response: Response, next: NextFunction) {
	}

	static async authorize(request: Request, response: Response, next: NextFunction) {
	}

	static async delete(request: Request, response: Response) {
	}
}
