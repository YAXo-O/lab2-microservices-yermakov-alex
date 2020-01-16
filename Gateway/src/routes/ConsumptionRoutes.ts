import Controller from '@controller/ConsumptionController';
import Validation from '@validation/ConsumptionValidation';
import {Router} from 'express';

const router = Router();

/**
 * Create new consumption
 * @route POST /
 * @group Consumption - consumption operations
 * @produces application/json
 * @consumes application/json
 * @param {CreateParams} request.body - Create new consumption parameters
 * @returns {number} 201 - Consumption has been successfully created (returns json containing consumption)
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.post('/', Validation.create(), Controller.create);

/**
 * Get consumption page or current consumption
 * @route GET /
 * @group Consumption - consumption operations
 * @produces application/json
 * @consumes application/json
 * @param {GetParams} request.query - Get consumption params
 * @returns {number} 200 - Consumption(s) has been successfully fetched
 * @returns {number} 400 - Invalid data passed (details description is returned as json)
 * @returns {number} 500 - Internal server error (detailed description is return as json)
 */
router.get('/', Validation.get(), Controller.get);

/**
 * Update current consumption
 * @route PATCH /
 * @group Consumption - consumption operations
 * @produces application/json
 * @consumes application/json
 * @param {UpdateParams} request.body - Update consumption parameters
 * @returns {number} 200 - consumption has been successfully updated
 * @returns {number} 400 - Invalid data passed (detailed description is returned as json)
 * @return {number} 500 - Internal server error (detailed description is returned as json)
 */
router.patch('/', Validation.update(), Controller.update);

/**
 * Delete current consumption
 * @route DELETE /
 * @group Consumption - consumption operations
 * @produces application/json
 * @consumes application/json
 * @param {DeleteParams} request.query - Delete consumption params
 * @returns {number} 200 - Consumption has been successfully deleted
 * @returns {number} 400 - Invalid data passed (details description is returned as json)
 * @returns {number} 500 - Internal server error (detailed description is return as json)
 */
router.delete('/', Validation.delete(), Controller.delete);

export default router;
