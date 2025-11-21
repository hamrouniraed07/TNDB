import Joi from "joi";
import { ObjectID } from "mongodb";
import mongoose from "mongoose";
import Review from "../../models/review.model";
import Movie from "../../models/movie.model";


export async function addReview(req, res) {
    try {
        const body = {
            movieId: req.body.movie,
            review: req.body.review,
        };

        const bodyScheme = Joi.object({
            movieId: Joi.string().required(),
            review: Joi.string().required(),
        });

        const { error } = bodyScheme.validate(body);

        if (error && error.details){
            // console.log(error.details);
            return res.status(400).json({ message: "invalid input" });
        }


        if (!ObjectID.isValid(body.movieId))
            return res.status(400).json({ message: "invalid objectID" });

        const movie = await Movie.findOne({
            _id: mongoose.Types.ObjectId(body.movieId),
        });

        if (!movie)
            return res.status(400).json({ message: "item doesn't exist" });

        const review = new Review({
            _id: new mongoose.Types.ObjectId(),
            movie: mongoose.Types.ObjectId(body.movieId),
            user: mongoose.Types.ObjectId(req.payload._id),
            review: req.body.review,
        });

        await review.save();

        return res.status(200).json({ message : "done !" });
    } catch (error) {
        return res.status(500).json({ message: "unknown error occured" });
    }
}
