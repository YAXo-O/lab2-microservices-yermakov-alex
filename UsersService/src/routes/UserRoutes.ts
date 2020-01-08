import Controller from '@controller/UserController';
import {Router} from 'express';

const router = Router();

router.post('/register', Controller.register);
router.post('/authorize', Controller.authorize);
router.get('/:page', Controller.get);
router.delete('/', Controller.delete);

export default router;
