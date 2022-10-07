import Video from '../models/Video.js';

class ApiController {
    // [GET] /
    home(req, res, next) {
        res.render('home');
    }
}

export default new ApiController();
