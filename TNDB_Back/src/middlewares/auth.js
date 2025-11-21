import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';
import User from "../models/user.model"



export async function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token)
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'required_token' });

        return jwt.verify(token, "voiture", async (err, payload) => {
            if (err)
                return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'unauthorized' });

            const user = await User.findOne({ _id: mongoose.Types.ObjectId(payload._id) });

            if (!user)
                return res.status(HttpStatus.FORBIDDEN).json({ message: 'access_denied' });

            if (!user.token)
                return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'you_have_to_login_first' });

            if(user.token !== token)
                return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'unauthorized' });

            req.payload = payload;
            next();
        })

    } catch (error) {
        console.log("auth middleware err :", error)
    }
}

export async function roleGuard(req, res, next) {
    try {
        const user = await User.findOne({_id: mongoose.Types.ObjectId(req.payload._id)});

        if(user && user.role === "ADMIN")
            next();
        else
            return res.status(HttpStatus.UNAUTHORIZED).json({message : "unauthorized"});

    } catch (error) {
        console.log("role guard err :", error)
    }
}