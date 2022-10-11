import express from 'express';
import videoApiRouter from './videosApi.js';
import userApiRouter from './usersApi.js';

const router = express.Router();

// RESTful API will provide data for user permission

router.use('/video', videoApiRouter);
router.use('/user', userApiRouter);

export default router;
