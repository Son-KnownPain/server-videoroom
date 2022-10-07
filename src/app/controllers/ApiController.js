import Video from '../models/Video.js';
import User from '../models/User.js';

class ApiController {
    // [GET] /api/all-videos
    allVideos(req, res, next) {
        Video.find({})
            .then((videos) => {
                res.json(videos);
            })
            .catch(next);
    }

    // [GET] /users/:id
    userById(req, res, next) {
        User.findOne({ _id: req.params.id })
            .then((user) => {
                res.json(user);
            })
            .catch(next);
    }
}

export default new ApiController();
