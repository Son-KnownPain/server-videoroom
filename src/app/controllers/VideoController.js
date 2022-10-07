import Video from '../models/Video.js';

class VideoController {
    // [GET] /videos/:id
    detailsById(req, res, next) {
        Video.findOne({ _id: req.params.id })
            .then((video) => res.json(video))
            .catch(next);
    }

    // [POST] /videos/stored
    store(req, res, next) {
        const video = new Video(req.body);
        video
            .save()
            .then(() => {
                res.json({
                    message: 'Thanh cong',
                });
            })
            .catch(next);
    }

    // [DELETE] /videos/:id
    deleteById(req, res, next) {
        const videoId = req.params.id;
        Video.delete({ _id: videoId })
            .then(() =>
                res.json({
                    isDelete: true,
                }),
            )
            .catch(() =>
                res.status(404).json({
                    message: 'Delete fail! Please check video id',
                }),
            );
    }

    // [PUT] /videos/:id
    update(req, res, next) {
        Video.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.json({
                    isUpdate: true,
                });
            })
            .catch(next);
    }

    // [PATCH] /videos/:id/restore
    restore(req, res, next) {
        Video.restore({ _id: req.params.id })
            .then(() => {
                res.json({
                    isRestore: true,
                });
            })
            .catch(next);
    }
}

export default new VideoController();
