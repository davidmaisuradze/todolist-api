import Joi from 'joi';

export default {
    createTask: {
        body: {
            title: Joi.string().max(250).required(),
            description: Joi.string().max(1000).required(),
            dueDate: Joi.date().required(),
            status: Joi.string().max(50).required()
        }
    },
    updateTask: {
        body: {
            id: Joi.string().required(),
            title: Joi.string().max(250).required(),
            description: Joi.string().max(1000).required(),
            dueDate: Joi.date().required(),
            status: Joi.string().max(50).required()
        }
    },
    assignTask: {
        body: {
            taskId: Joi.string().required(),
            assigneeId: Joi.string().required()
        }
    },
    deleteTask: {
        params: {
            taskId: Joi.string()
        }
    }
}
