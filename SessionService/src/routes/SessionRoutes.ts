import Controller from '@controller/SessionController';
import Validation from '@validation/SessionValidation';
import {Router} from 'express';

const router = Router();

router.post('/', Validation.create(), Controller.create);
router.get('/', Validation.get(), Controller.get);
router.patch('/', Validation.update(), Controller.update);
router.delete('/', Validation.delete(), Controller.delete);

export default router;
