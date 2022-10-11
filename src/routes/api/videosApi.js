import VideoController from '../../app/controllers/VideoController.js';
import express from 'express';

const router = express.Router();

router.get('/all', VideoController.allVideos);
router.get('/java', VideoController.videoJava);

export default router;
