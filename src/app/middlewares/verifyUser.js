import jwt from 'jsonwebtoken';

export default function verifyUser(req, res, next) {
    if (!req.headers.authorization)
        return res.json({
            message: 'Xác thực người dùng không thành công',
        });
    const [, clientAccessToken] = req.headers.authorization.split(' ');
    console.log('access token: ', clientAccessToken);
    if (!clientAccessToken) return res.status(401);

    jwt.verify(clientAccessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err)
            return res.status(401).json({
                message: 'Xác thực người dùng không thành công',
                is_expired: true,
            });

        next();
    });
}
