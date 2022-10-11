import verifyUser from '../app/middlewares/verifyUser.js';
import verifyAdmin from '../app/middlewares/verifyAdmin.js';
import videosRouter from './videos.js';
import usersRouter from './users.js';
import authRouter from './auth.js';
import siteRouter from './site.js';
import apiRouter from './api/index.js';

function routes(app) {
    app.use('/api', verifyUser, apiRouter);
    app.use('/users', verifyAdmin, usersRouter);
    app.use('/videos', verifyAdmin, videosRouter);
    app.use('/auth', authRouter);
    app.use('/', siteRouter);
}

export default routes;
