import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default function verifyAdmin(req, res, next) {
    const [, clientAccessToken] = req.headers.authorization.split(' ');
    if (!clientAccessToken) return res.status(401);

    jwt.verify(clientAccessToken, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        const username = data.username;
        let user = await User.findOne({ username: username });

        if (err || user.permission !== 'admin')
            return res.status(401).json({
                message: 'Xác thực người dùng không thành công',
            });

        next();
    });
}
