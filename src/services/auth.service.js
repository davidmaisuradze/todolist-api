import User from "../models/user.model";
import HttpStatus from "../controllers/auth/auth.controller";

export const loginUser = async (res, email, password) => {
    try {
        const user = await User.findOne({email: email});

        if (user && user.isValidPassword(password)) {
            return res.status(HttpStatus.OK).json(user.toAuthJSON());
        } else {
            return res.status(HttpStatus.BAD_REQUEST).json('Invalid credentials');
        }
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
}
