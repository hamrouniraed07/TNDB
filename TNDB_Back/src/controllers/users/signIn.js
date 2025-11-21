import User from "../../models/user.model"
import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import { compare } from "bcryptjs";


export async function signIn(req, res) {
    try {
        // inputs
        const body = {
            email: req.body.email,
            password: req.body.password,
        };
        // validation
        const BodySchema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().min(8).required(),
        });
        const { error } = BodySchema.validate(body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'invalid_input_data' });
        }

        const user = await User.findOne({email : body.email});

        if(!user)
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'user_not_found' });

        const correctPass = await compare(body.password, user.password );

        if(!correctPass)
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'invalid_password' });

        const token = await user.genAuthToken();

        user.token = token;

        await user.save();

        res.cookie('token', token);

        return res.status(HttpStatus.OK).json({ token });

    } catch (error) {
        console.log(error)
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'unknown_error_occurred' });
    }
}