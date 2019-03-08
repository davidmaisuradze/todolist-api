import {Router} from 'express';
import validate from 'express-validation';

import * as TasksController from '../controllers/tasks/tasks.controller';
import validators from '../controllers/tasks/tasks.validators';
import authenticate from '../middlewares/authenticate';

const routes = new Router();

// GET
routes.get('/', TasksController.getTasks);

// POST
routes.post('/', authenticate, validate(validators.createTask), TasksController.createTask);

// PUT
routes.put('/', authenticate, validate(validators.updateTask), TasksController.updateTask);
routes.put('/assignTask', authenticate, validate(validators.assignTask), TasksController.assignTaskToUser);

// DELETE
routes.delete('/:taskId', authenticate, validate(validators.deleteTask), TasksController.deleteTask);

export default routes;
