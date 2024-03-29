import Task from "../models/task.model";
import User from "../models/user.model";
import HttpStatus from 'http-status';

export const getTasks = async () => {
    try {
        let tasks = await Task.find({}).sort({title: 1});
        return {status: HttpStatus.OK, data: tasks};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const createTask = async (data, currentUserId) => {
    try {
        const checkTask = await Task.findOne({title: data.title});
        if (checkTask) {
            return {status: HttpStatus.CONFLICT, data: 'such task already exists'};
        }

        // set task data
        const task = new Task({
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            status: data.status,
            userId: currentUserId
        });

        // save Task
        const result = await task.save();
        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const updateTask = async (data, currentUserId) => {
    try {
        const result = await Task.findOneAndUpdate(
            {_id: data.id},
            {
                $set: {
                    title: data.title,
                    description: data.description,
                    dueDate: data.dueDate,
                    status: data.status,
                    userId: currentUserId
                }
            },
            {upsert: true, new: true}
        );

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const assignTaskToUser = async (data) => {
    try {
        const user = await User.find({_id: data.assigneeId});
        if (!user) {
            return {status: HttpStatus.BAD_REQUEST, data: 'user not found'};
        }

        const task = await Task.find({_id: data.taskId});
        if (!task) {
            return {status: HttpStatus.BAD_REQUEST, data: 'task not found'};
        }

        user.tasks.push(task._id);
        const result = await user.save();
        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const deleteTask = async (taskId) => {
    try {
        const result = await Task.findOneAndDelete({_id: taskId});

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};
