import Controller from '@controller/EventController';
import Validation from '@validation/EventValidation';
import {Router} from 'express';

const router = Router();

/**
 * Create new event
 * @route POST /
 * @group Event - event operations
 * @produces application/json
 * @consumes application/json
 * @param {CreateParams} request.body - Create new event parameters
 * @returns {number} 201 - Event has been successfully created (returns json containing user)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.post('/', Validation.create(), Controller.create);

/**
 * Get event page or current event
 * @route GET /
 * @group Event - event operations
 * @produces application/json
 * @consumes application/json
 * @param {GetParams} request.query - Get event params
 * @returns {number} 200 - Event(s) has been successfully fetched
 * @returns {number} 400 - Invalid data passed (details description is returned as json)
 * @returns {number} 500 - Internal server error (detailed description is return as json)
 */
router.get('/', Validation.get(), Controller.get);

/**
 * Update current event
 * @route PATCH /
 * @group Event - event operations
 * @produces application/json
 * @consumes application/json
 * @param {UpdateParams} request.body - Update event parameters
 * @returns {number} 200 - Event has been successfully updated
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.patch('/', Validation.update(), Controller.update);

/**
 * Delete current event
 * @route DELETE /
 * @group Event - event operations
 * @produces application/json
 * @consumes application/json
 * @param {DeleteParams} request.query - Delete event params
 * @returns {number} 200 - Eve t has been successfully deleted
 * @returns {number} 400 - Invalid data passed (details description is returned as json)
 * @returns {number} 500 - Internal server error (detailed description is return as json)
 */
router.delete('/', Validation.delete(), Controller.delete);

export default router;
