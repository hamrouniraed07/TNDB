import Joi from "joi";
import { ObjectID } from "mongodb";
import mongoose from "mongoose";
import Movie from "../../models/movie.model";
import Rating from "../../models/rating.model";

export async function addRating(req, res) {
    try {
        const body = {
            movieId: req.body.movie,
            rating: req.body.rating,
        };

        const bodyScheme = Joi.object({
            rating: Joi.number().required(),
            movieId: Joi.string().required(),
        });

        const { error } = bodyScheme.validate(body);

        if (error && error.details)
            return res.status(400).json({ message: "invalid input" });

        if (!ObjectID.isValid(body.movieId))
            return res.status(400).json({ message: "invalid objectID" });

        const movie = await Movie.findOne({
            _id: mongoose.Types.ObjectId(body.movieId),
        });

        if (!movie)
            return res.status(400).json({ message: "item doesn't exist" });

        const rating = new Rating({
            _id: new mongoose.Types.ObjectId(),
            movie: mongoose.Types.ObjectId(body.movieId),
            user: mongoose.Types.ObjectId(req.payload._id),
            rating: req.body.rating,
        });

        await rating.save();

        return res.status(200).json({ success : true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "unknown error occured" });
    }
}
