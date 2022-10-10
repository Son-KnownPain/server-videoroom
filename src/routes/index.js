import verifyUser from '../app/middlewares/verifyUser.js';
import verifyAdmin from '../app/middlewares/verifyAdmin.js';
import apiRouter from './api.js';
import videosRouter from './videos.js';
import usersRouter from './users.js';
import authRouter from './auth.js';
import siteRouter from './site.js';

function routes(app) {
    app.use('/api', apiRouter);
    app.use('/users', usersRouter);
    app.use('/videos', videosRouter);
    app.use('/auth', authRouter);
    app.use('/', siteRouter);
}

export default routes;
