import User from "../../models/user.model"
import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import mongoose from "mongoose";
import shell from '../../utils/shell'

export async function signUp(req, res) {
    try {
        // inputs
        const body = {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nickName: req.body.nickName
        };
        // validation
        const BodySchema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().min(8).required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            nickName: Joi.string().required(),
        });
        const { error } = BodySchema.validate(body);
        if (error && error.details) {
            console.log(error.details);
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'invalid_input_data' });
        }

        const emailUsed = await User.findOne({email : body.email});

        if(emailUsed)
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'email_already_used' });
        
        const newUserId = new mongoose.Types.ObjectId();
        const profilePic = req.files.profilePicture[0];
        const coverPic = req.files.coverPicture[0];
        

        const coverPicturePath = `static/users/cover/${newUserId}.${coverPic.mimetype.split('/')[1]}`;
        const profilePicturePath = `static/users/profile/${newUserId}.${profilePic.mimetype.split('/')[1]}`;
        const profileTempPath = `src/uploads/tmp/${profilePic.originalname.split('.')[0]}.${profilePic.mimetype.split('/')[1]}`
        const coverTempPath = `src/uploads/tmp/${coverPic.originalname.split('.')[0]}.${coverPic.mimetype.split('/')[1]}`

        await shell.exec(`mv ${coverTempPath} ${coverPicturePath}`);
        await shell.exec(`mv ${profileTempPath} ${profilePicturePath}`);

        // await shell.exec(`rm -f ${coverTempPath}`)
        // await shell.exec(`rm -f ${profileTempPath}`)

        const newUser = {
            _id: newUserId,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            nickName: body.nickName,
            watchList: [],
            coverPicture: coverPicturePath,
            profilePicture: profilePicturePath,
            token : '',
            createdAt: new Date(),
        }

        await User.create(newUser);

        return res.status(HttpStatus.CREATED).json({ message : "signed up!" });

    } catch (error) {
        console.log(error)
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'unknown_error_occurred' });
    }
}