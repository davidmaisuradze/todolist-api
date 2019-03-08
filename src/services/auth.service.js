import User from "../models/user.model";
import HttpStatus from "../controllers/auth/auth.controller";

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
