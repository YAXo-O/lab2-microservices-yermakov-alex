import Controller from '@controller/AuthController';
import Validation from '@validation/AuthValidation';
import {Router} from 'express';

const router = Router();

router.post('/register', Validation.register(), Controller.register);
router.post('/login', Validation.getCode(), Controller.getCode);
router.post('/token', Validation.getToken(), Controller.getToken);
router.post('/user', Validation.getUser(), Controller.getUser);
router.post('/refreshToken', Validation.refreshToken(), Controller.refreshToken);

export default router;
