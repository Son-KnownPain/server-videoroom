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
        if (!clientRefreshToken) return res.status(401).json({ message: 'You need refresh token' });

        jwt.verify(clientRefreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, data) => {
            if (err) return res.status(401).json({ isVerify: false });

            const username = data.username;

            const token = await Token.findOne({ token_username: username });

            if (token) {
                if (token.refresh_token !== clientRefreshToken) return res.json({ isVerify: false });
                const newAccessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '30m',
                });
                res.json({
                    access_token: newAccessToken,
                });
            } else {
                res.json({
                    message: '????y l?? refresh token c?? kh??ng tr??ng kh???p v???i t??i kho???n v?? c???n ????ng nh???p l???i',
                });
            }
        });
    }
}

export default new AuthController();
