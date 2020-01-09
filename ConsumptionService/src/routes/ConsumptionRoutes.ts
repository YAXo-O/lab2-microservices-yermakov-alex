import Controller from '@controller/ConsumptionController';
import Validation from '@validation/ConsumptionValidation';
import {Router} from 'express';

const router = Router();

/**
 * Create new consumption
 * @route POST /
 * @group Consumption - consumption CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {CreateParams} request.body - Create new consumption parameters
 * @returns {number} 200 - Consumption has been successfully created (returns json containing consumption)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.post('/', Validation.create(), Controller.create);
/**
 * Get page (list of up to 20 consumptions) or specified consumption
 * @route GET /
 * @group Consumption - consumption CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {GetParams} request.query - Params of consumption(s) to be retrieved
 * @returns {number} 200 - Consumptions have been successfully retrieved
 * (returns json containing consumption or PageResponse)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.get('/', Validation.get(), Controller.get);
/**
 * Update specified consumption
 * @route PATCH /
 * @group Consumption - consumption CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {CreateParams} request.body - Params for update
 * @returns {number} 200 - Consumption has been successfully updated
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.patch('/', Validation.update(), Controller.update);
/**
 * Delete specified consumption
 * @route DELETE /
 * @group Consumption - consumption CRUD operations
 * @produces application/json
 * @consumes application/json
 * @param {DeleteParams} request.query - Params of consumption to be deleted
 * @returns {undefined} 200 - Consumption has been successfully deleted
 * @returns {object} 400 - Invalid data passed (detailed description is returned as json)
 * @return {object} 500 - Internal server error (detailed description is returned as json)
 */
router.delete('/', Validation.delete(), Controller.delete);

export default router;
