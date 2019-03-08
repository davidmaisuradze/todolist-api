import Joi from 'joi';

export default {
    login: {
        body: {
            email: Joi.string().email({minDomainAtoms: 2}).required(),
            password: Joi.string().required()
        }
    },
    register: {
        body: {
            email: Joi.string().email({minDomainAtoms: 2}).required(),
            // should contain at least one small and capitalize letters, number. length must be greater than 6
            password: Joi.string().regex(/^[a-zA-Z0-9]*$/).min(6).required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required()
        }
    }
};
