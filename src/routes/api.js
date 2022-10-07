import express from 'express';
import ApiController from '../app/controllers/ApiController.js';

const router = express.Router();

router.get('/all-videos', ApiController.allVideos);
router.get('/user/:id', ApiController.userById);

export default router;
