import Controller from '@controller/ConsumerController';
import Validation from '@validation/ConsumerValidation';
import {Router} from 'express';

const router = Router();

/**
 * Create new consumer
 * @route POST /
 * @group Consumer - consumer operations
 * @produces application/json
 * @consumes application/json
 * @param {CreateParams} request.body - Create new consumer parameters
 * @returns {number} 201 - Consumer has been successfully created (returns json containing consumer)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.post('/', Validation.create(), Controller.create);

/**
 * Get event page or current consumer
 * @route GET /
 * @group Consumer - consumer operations
 * @produces application/json
 * @consumes application/json
 * @param {GetParams} request.query - Get consumer params
 * @returns {number} 200 - Consumer(s) has been successfully fetched
 * @returns {number} 400 - Invalid data passed (details description is returned as json)
 * @returns {number} 500 - Internal server error (detailed description is return as json)
 */
router.get('/', Validation.get(), Controller.get);

/**
 * Update current consumer
 * @route PATCH /
 * @group Consumer - consumer operations
 * @produces application/json
 * @consumes application/json
 * @param {UpdateParams} request.body - Update consumer parameters
 * @returns {number} 200 - consumer has been successfully updated
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.patch('/', Validation.update(), Controller.update);

/**
 * Delete current consumer
 * @route DELETE /
 * @group Consumer - consumer operations
 * @produces application/json
 * @consumes application/json
 * @param {DeleteParams} request.query - Delete consumer params
 * @returns {number} 200 - Consumer has been successfully deleted
 * @returns {number} 400 - Invalid data passed (details description is returned as json)
 * @returns {number} 500 - Internal server error (detailed description is return as json)
 */
router.delete('/', Validation.delete(), Controller.delete);

export default router;
