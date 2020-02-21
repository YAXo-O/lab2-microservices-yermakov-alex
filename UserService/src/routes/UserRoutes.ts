import Controller from '@controller/UserController';
import Validation from '@validation/UserValidation';
import {Router} from 'express';

const router = Router();

/**
 * Create new user
 * @route POST /
 * @group User - user CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {CreateParams} request.body - Create new user parameters
 * @returns {number} 200 - User has been successfully created (returns json containing user)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.post('/', Validation.create(), Controller.create);
/**
 * Get page (list of up to 20 users) or specified user
 * @route GET /
 * @group User - user CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {GetParams} request.query - Params of user(s) to be retrieved
 * @returns {number} 200 - Users have been successfully retrieved (returns json containing user or PageResponse)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.get('/', Validation.get(), Controller.get);
/**
 * Update specified user
 * @route PATCH /
 * @group User - user CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {CreateParams} request.body - Params for update
 * @returns {number} 200 - User has been successfully updated
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.patch('/', Validation.update(), Controller.update);
/**
 * Delete specified session
 * @route DELETE /
 * @group User - user CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {DeleteParams} request.query - Params of user to be deleted
 * @returns {undefined} 200 - User has been successfully deleted
 * @returns {object} 400 - Invalid data passed (detailed description is returned as json)
 * @return {object} 500 - Internal server error (detailed description is returned as json)
 */
router.delete('/', Validation.delete(), Controller.delete);

router.get('/token', Validation.token(), Controller.token);

export default router;
