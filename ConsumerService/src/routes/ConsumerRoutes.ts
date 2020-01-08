import Controller from '@controller/ConsumerController';
import Validation from '@validation/ConsumerValidation';
import {Router} from 'express';

const router = Router();

/**
 * Create new session
 * @route POST /
 * @group Consumer - Consumer CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {CreateParams} request.body - Create new consumer parameters
 * @returns {number} 200 - Consumer has been successfully created (returns json containing consumer)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.post('/', Validation.create(), Controller.create);
/**
 * Get page (list of up to 20 consumers) or specified consumer
 * @route GET /
 * @group Consumer - consumer CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {GetParams} request.query - Params of consumer(s) to be retrieved
 * @returns {number} 200 - Consumers have been successfully retrieved (returns json containing consumer or PageResponse)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.get('/', Validation.get(), Controller.get);
/**
 * Update specified consumer
 * @route PATCH /
 * @group Consumer - consumer CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {CreateParams} request.body - Params for update
 * @returns {number} 200 - Consumer has been successfully updated
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.patch('/', Validation.update(), Controller.update);
/**
 * Delete specified consumer
 * @route DELETE /
 * @group Consumer - consumer CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {DeleteParams} request.query - Params of consumer to be deleted
 * @returns {undefined} 200 - Consumer has been successfully deleted
 * @returns {object} 400 - Invalid data passed (detailed description is returned as json)
 * @return {object} 500 - Internal server error (detailed description is returned as json)
 */
router.delete('/', Validation.delete(), Controller.delete);

export default router;
