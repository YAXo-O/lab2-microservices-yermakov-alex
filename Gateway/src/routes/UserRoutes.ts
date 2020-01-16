import Controller from '@controller/UserController';
import Validation from '@validation/UserValidation';
import {Router} from 'express';

const router = Router();

/**
 * Create new user
 * @route PUT /
 * @group User - user operations
 * @produces application/json
 * @consumes application/json
 * @param {RegisterParams} request.body - Create new user parameters
 * @returns {number} 200 - User has been successfully created (returns json containing user)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.put('/', Validation.register(), Controller.register);

export default router;
