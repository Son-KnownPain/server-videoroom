import User from '../models/User.js';
import Token from '../models/Token.js';
import jwt from 'jsonwebtoken';

class AuthController {
    // [POST] /auth/login
    login(req, res, next) {
        const { username, password } = req.body;

        User.findOne({ username: username, password: password })
            .then(async (user) => {
                if (!user) {
                    res.status(401).json({ is_login_fail: true, message: 'Incorrect username or password' });
                } else {
                    const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '60m',
                    });

                    const tokenByUsername = await Token.findOne({ token_username: username });

                    if (!tokenByUsername) {
                        const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET);
                        const token = new Token({ token_username: username, refresh_token: refreshToken });

                        token
                            .save()
                            .then(() => {
                                res.json({
                                    access_token: accessToken,
                                    refresh_token: refreshToken,
                                    user_id: user._id,
                                });
                            })
                            .catch(next);
                    } else {
                        Token.findOne({ token_username: username }).then((token) => {
                            res.json({
                                access_token: accessToken,
                                refresh_token: token.refresh_token,
                                user_id: user._id,
                            });
                        });
                    }
                }
            })
            .catch(next);
    }

    // [POST] /auth/refresh-token
    refreshToken(req, res, next) {
        const clientRefreshToken = req.body.refreshToken;
        if (!clientRefreshToken) return res.status(401).send('Have not refresh token');

        jwt.verify(clientRefreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, data) => {
            if (err) return res.status(401).send('Invalid refresh token');

            const username = data.username;

            const token = await Token.findOne({ token_username: username });

            if (token) {
                const newAccessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '30m',
                });
                res.json({
                    access_token: newAccessToken,
                });
            } else {
                res.json({
                    message: 'Đây là refresh token cũ không trùng khớp với tài khoản và cần đăng nhập lại',
                });
            }
        });
    }
}

export default new AuthController();
