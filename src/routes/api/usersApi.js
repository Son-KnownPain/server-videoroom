import UserController from '../../app/controllers/UserController.js';
import express from 'express';

const router = express.Router();

router.get('/:id', UserController.userById);

export default router;
