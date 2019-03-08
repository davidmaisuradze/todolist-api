import HttpStatus from 'http-status';
import * as authService from '../../services/auth.service';

export const getUsers = async (req, res, next) => {
    const result = await authService.getUsers(req.currentUser._id);
    return res.status(result.status).json(result.data);
};

export const login = async (req, res, next) => {
    const {email, password} = req.body;

    const result = await authService.loginUser(email, password);
    return res.status(result.status).json(result.data);
};

export const register = async (req, res, next) => {
    const result = await authService.register(req.body);
    return res.status(result.status).json(result.data);
};

export const getCurrentUser = async (req, res, next) => {
    try {
        const {currentUser} = req;
        return res.status(HttpStatus.OK).json({
            user: {
                email: currentUser.email,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName
            }
        });
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
};
