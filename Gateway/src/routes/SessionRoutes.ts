import Controller from '@controller/SessionController';
import Validation from '@validation/SessionValidation';
import {Router} from 'express';

const router = Router();

/**
 * Create new session
 * @route POST /
 * @group Session - session operations
 * @produces application/json
 * @consumes application/json
 * @param {CreateParams} request.body - Create new session parameters
 * @returns {number} 201 - Session has been successfully created (returns json containing user)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.post('/', Validation.create(), Controller.create);

/**
 * Get sessions page or current page
 * @route GET /
 * @group Session - session operations
 * @produces application/json
 * @consumes application/json
 * @param {GetParams} request.query - Get session params
 * @returns {number} 200 - Session(s) has been successfully fetched
 * @returns {number} 400 - Invalid data passed (details description is returned as json)
 * @returns {number} 500 - Internal server error (detailed description is return as json)
 */
router.get('/', Validation.get(), Controller.get);

/**
 * Update current session
 * @route PATCH /
 * @group Session - session operations
 * @produces application/json
 * @consumes application/json
 * @param {UpdateParams} request.body - Update session parameters
 * @returns {number} 200 - Session has been successfully updated
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.patch('/', Validation.update(), Controller.update);

/**
 * Delete current session
 * @route DELETE /
 * @group Session - session operations
 * @produces application/json
 * @consumes application/json
 * @param {DeleteParams} request.query - Delete session params
 * @returns {number} 200 - Session has been successfully deleted
 * @returns {number} 400 - Invalid data passed (details description is returned as json)
 * @returns {number} 500 - Internal server error (detailed description is return as json)
 */
router.delete('/', Validation.delete(), Controller.delete);

export default router;
