import mongoose from "mongoose"
import Review from "../../models/review.model"


export async function getMovieReviews(req, res) {
    try {
        const reviews = await Review.aggregate([
            {
                $match : {
                    movie: mongoose.Types.ObjectId(req.params.movieId)
                }
            },
            {
                $lookup : {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as:"user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project : {
                    _id : 1,
                    movie : 1,
                    review : 1,
                    user : {
                        _id : "$user._id",
                        fullName: {
                            $concat : ["$user.firstName"," ","$user.lastName"]
                        },
                        profilePicture : "$user.profilePicture"
                    }
                }
            }
        ]);
        return res.status(200).json({reviews});

    } catch (error) {
        return res.status(500).json({message : "unknown error occured"});
    }
}