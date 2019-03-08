import User from '../../models/user.model';
import HttpStatus from 'http-status';
import * as authService from '../../services/auth.service';

export const login = async (req, res, next) => {
    const {email, password} = req.body;

    return await authService.loginUser(res, email, password);
};

export const register = async (req, res, next) => {
    try {
        const data = req.body;

        const user = new User({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName
        });
        user.generatePasswordHash(data.password);
        const result = await user.save();

        return res.json(result.toAuthJSON());
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
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
