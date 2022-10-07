import express from 'express';
import UserController from '../app/controllers/UserController.js';

const router = express.Router();

router.post('/store', UserController.store);
router.put('/:id', UserController.update);

export default router;
