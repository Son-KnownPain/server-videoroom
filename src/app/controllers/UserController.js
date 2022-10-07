import User from '../models/User.js';

class UserController {
    // [POST] /users/store
    store(req, res, next) {
        const newUser = new User(req.body);
        newUser
            .save()
            .then(() => {
                res.json({
                    isStore: true,
                });
            })
            .catch(next);
    }

    // [PUT] /users/:id
    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.json({
                    is_update: true,
                });
            })
            .catch(next);
    }
}

export default new UserController();
