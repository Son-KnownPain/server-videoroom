import express from 'express';
import VideoController from '../app/controllers/VideoController.js';

const router = express.Router();

router.get('/:id', VideoController.detailsById);
router.post('/store', VideoController.store);
router.put('/:id', VideoController.update);
router.delete('/:id', VideoController.deleteById);
router.patch('/:id/restore', VideoController.restore);

export default router;
