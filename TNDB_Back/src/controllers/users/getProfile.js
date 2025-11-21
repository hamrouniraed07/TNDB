import User from "../../models/user.model";
import Joi from "joi";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";

export async function getProfile(req, res) {
    try {
        const user = await User.aggregate([
            {
                $match : {
                    _id : mongoose.Types.ObjectId(req.payload._id)
                }
            },
            {
                $unwind: {
                    path: "$watchList",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup : {
                    from: "movies",
                    localField: "watchList._id",
                    foreignField: "_id",
                    as: "watchList._id"
                }
            },
            {
                $unwind : {
                    path : "$watchList._id",
                    preserveNullAndEmptyArrays : true
                }
            },
            {
                $project : {
                    _id : 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    nickName: 1,
                    coverPicture: 1,
                    profilePicture: 1,
                    role: 1,
                    watchList: {
                        movie : "$watchList._id",
                        isFavourite : "$watchList.isFavourite"
                    }
                }
            },
            {
                $group : {
                    _id : "$_id",
                    firstName: {
                        $first : "$firstName"
                    },
                    lastName: {
                        $first : "$lastName"
                    },
                    email: {
                        $first : "$email"
                    },
                    nickName: {
                        $first : "$nickName"
                    },
                    coverPicture: {
                        $first : "$coverPicture"
                    },
                    profilePicture: {
                        $first : "$profilePicture"
                    },
                    role: {
                        $first : "$role"
                    },
                    watchList: {
                        $addToSet : "$watchList"
                    }
                }
            }
        ]);

        if (user.length === 0)
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "user_not_found",
            });
        
        return res.status(HttpStatus.OK).json({ user : user[0] });

    } catch (error) {
        console.log(error);
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "unknown_error_occurred" });
    }
}
