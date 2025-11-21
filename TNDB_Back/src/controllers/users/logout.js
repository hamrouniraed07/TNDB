import User from "../../models/user.model"
import HttpStatus from 'http-status-codes';
import mongoose from "mongoose";

export async function logout(req, res) {
    try {
        // get current user
        const user = await User.findOne({
            _id: mongoose.Types.ObjectId(req.payload._id)
        });

        user.token = "";

        await user.save();


        res.cookie('token', "")

        return res.status(HttpStatus.OK).json({ success: true });

    } catch (error) {
        console.log(error)
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'unknown_error_occurred' });
    }
}