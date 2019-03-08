import User from "../models/user.model";
import HttpStatus from 'http-status';

export const getUsers = async (currentUserId) => {
    try {
        const users = await User.find({"_id": {"$ne": currentUserId}}).sort({firstName: 1});
        return {status: HttpStatus.OK, data: users};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({email: email});

        if (user && user.isValidPassword(password)) {
            return {status: HttpStatus.OK, data: user.toAuthJSON()};
        } else {
            return {status: HttpStatus.BAD_REQUEST, data: 'Invalid credentials'};
        }
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const register = async (data) => {
    try {
        const checkUser = await User.findOne({email: data.email});
        if (checkUser) {
            return {status: HttpStatus.CONFLICT, data: 'user already exists'};
        }

        const user = new User({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName
        });
        user.generatePasswordHash(data.password);
        const result = await user.save();

        return {status: HttpStatus.OK, data: result.toAuthJSON()};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};
