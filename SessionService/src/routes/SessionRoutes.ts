import Controller from '@controller/SessionController';
import Validation from '@validation/SessionValidation';
import {Router} from 'express';

const router = Router();

/**
 * Create new session
 * @route POST /
 * @group Session - session CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {CreateParams} request.body - Create new session parameters
 * @returns {number} 200 - Session has been successfully created (returns json containing session)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.post('/', Validation.create(), Controller.create);
/**
 * Get page (list of up to 20 sessions) or specified session
 * @route GET /
 * @group Session - session CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {GetParams} request.query - Params of session(s) to be retrieved
 * @returns {number} 200 - Sessions have been successfully retrieved (returns json containing session or PageResponse)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.get('/', Validation.get(), Controller.get);
/**
 * Update specified session
 * @route PATCH /
 * @group Session - session CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {CreateParams} request.body - Params for update
 * @returns {number} 200 - Session has been successfully updated
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.patch('/', Validation.update(), Controller.update);
/**
 * Delete specified session
 * @route DELETE /
 * @group Session - session CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {DeleteParams} request.query - Params of session to be deleted
 * @returns {undefined} 200 - Sessions have been successfully retrieved
 * @returns {object} 400 - Invalid data passed (detailed description is returned as json)
 * @return {object} 500 - Internal server error (detailed description is returned as json)
 */
router.delete('/', Validation.delete(), Controller.delete);

export default router;
