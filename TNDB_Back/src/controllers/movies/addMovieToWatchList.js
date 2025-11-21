import mongoose from "mongoose";
import Movie from "../../models/movie.model";
import User from "../../models/user.model";
import Joi from "joi";
import HttpStatus from "http-status-codes";

export async function addMovieToWatchList(req, res) {
    try {
        const body = {
            movie: req.body.movie,
        };

        const BodyScheme = Joi.object({
            movie: Joi.string().required(),
        });

        const { error } = BodyScheme.validate(body);
        if (error && error.details) {
            console.log(error.details);
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: "movie_not_specified" });
        }

        if (!mongoose.Types.ObjectId.isValid(body.movie))
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: "invalid_movie_id" });

        const movie = await Movie.findOne({
            _id: mongoose.Types.ObjectId(body.movie),
        });

        if (!movie)
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: "movie_doesnt_exist" });

        const user = await User.findOne({
            _id: mongoose.Types.ObjectId(req.payload._id),
        });

        user.watchList.push(movie._id);

        await user.save();

        return res.status(200).json({ message: "movie added to watchlist" });
    } catch (error) {
        return res.status(500).json({ message: "unknown error occured" });
    }
}
