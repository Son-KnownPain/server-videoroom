import express from 'express';
import AuthController from '../app/controllers/AuthController.js';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);

export default router;
