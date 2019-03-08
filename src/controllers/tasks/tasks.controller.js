import * as taskService from '../../services/task.service';

export const getTasks = async (req, res, next) => {
    const result = await taskService.getTasks();
    return res.status(result.status).json(result.data);
};

export const createTask = async (req, res, next) => {
    const result = await taskService.createTask(req.body, req.currentUser._id);
    return res.status(result.status).json(result.data);
};

export const updateTask = async (req, res, next) => {
    const result = await taskService.updateTask(req.body, req.currentUser._id);
    return res.status(result.status).json(result.data);
};

export const deleteTask = async (req, res, next) => {
    const result = await taskService.deleteTask(req.params.taskId);
    return res.status(result.status).json(result.data);
};


