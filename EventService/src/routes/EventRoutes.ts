import Controller from '@controller/EventController';
import Validation from '@validation/EventValidation';
import {Router} from 'express';

const router = Router();

/**
 * Create new event
 * @route POST /
 * @group Event - event CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {CreateParams} request.body - Create new event parameters
 * @returns {number} 200 - Event has been successfully created (returns json containing event)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.post('/', Validation.create(), Controller.create);
/**
 * Get page (list of up to 20 events) or specified event
 * @route GET /
 * @group Event - event CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {GetParams} request.query - Params of event(s) to be retrieved
 * @returns {number} 200 - Events have been successfully retrieved (returns json containing event or PageResponse)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.get('/', Validation.get(), Controller.get);
/**
 * Update specified event
 * @route PATCH /
 * @group Event - event CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {CreateParams} request.body - Params for update
 * @returns {number} 200 - Event has been successfully updated
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.patch('/', Validation.update(), Controller.update);
/**
 * Delete specified session
 * @route DELETE /
 * @group Event - event CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {DeleteParams} request.query - Params of event to be deleted
 * @returns {undefined} 200 - Event has been successfully deleted
 * @returns {object} 400 - Invalid data passed (detailed description is returned as json)
 * @return {object} 500 - Internal server error (detailed description is returned as json)
 */
router.delete('/', Validation.delete(), Controller.delete);

export default router;
