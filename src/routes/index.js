import {Router} from 'express';
import path from 'path';

import AuthRoutes from './auth.routes';
import TaskRoutes from './tasks.routes';

// middleware utils
import logError from '../utils/logError';

const routes = new Router();

routes.use('/auth', AuthRoutes);
routes.use('/task', TaskRoutes);

routes.all('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

routes.use(logError);

export default routes;
