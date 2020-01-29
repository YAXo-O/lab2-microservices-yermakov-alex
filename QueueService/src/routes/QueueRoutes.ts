import Controller from '@controller/QueueController';
import Validation from '@validation/QueueValidation';
import {Router} from 'express';

const router = Router();

router.post('/', Validation.enqueue(), Controller.enqueue);
router.get('/', [], Controller.requestDequeue);

export default router;
