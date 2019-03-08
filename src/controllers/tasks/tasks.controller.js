import HttpStatus from 'http-status';
import Task from '../../models/task.model';

export const getTasks = async (req, res, next) => {
    try {
        let tasks = await Task.find({}).sort({date: 1});

        return res.status(HttpStatus.OK).json(tasks);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err)
    }
};

export const createTask = async (req, res, next) => {
    try {
        const reqData = req.body;
        const checkTask = await Task.findOne({title: reqData.title});
        if (checkTask) {
            return res.status(HttpStatus.CONFLICT).json('suck task already exists');
        }

        // set task data
        const task = new Task({
            title: reqData.title,
            description: reqData.description,
            dueDate: reqData.dueDate,
            status: reqData.status,
            userId: req.currentUser._id
        });

        // save Task
        const result = await task.save();
        return res.status(HttpStatus.OK).json(result);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err)
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const reqData = req.body;

        const result = await Task.findOneAndUpdate(
            {_id: reqData.id},
            {
                $set: {
                    title: reqData.title,
                    description: reqData.description,
                    dueDate: reqData.dueDate,
                    status: reqData.status,
                    userId: req.currentUser._id,
                }
            },
            {upsert: true, new: true}
        );

        return res.status(HttpStatus.OK).json(result);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const result = await Task.findOneAndDelete({_id: req.params.taskId});

        return res.status(HttpStatus.OK).json(result);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
};


