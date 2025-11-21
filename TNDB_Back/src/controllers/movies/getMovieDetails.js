import { ObjectID } from "mongodb";
import mongoose from "mongoose";
import Movie from "../../models/movie.model";

export async function getMovieDetails(req, res) {
    try {
        const movieId = req.params.id;

        if(!movieId)
            return res.status(400).json({message:"id missing"})
        
        if(!ObjectID.isValid(movieId))
            return res.status(400).json({message:"invalid objectID"})

        const movie = await Movie.findOne({
            _id: mongoose.Types.ObjectId(movieId),
        }).populate("category");

        if(!movie)
            return res.status(400).json({message:"item doesn't exist"})

        return res.status(200).json({ movie });
    } catch (error) {
        return res.status(500).json({ message: "unknown error occured" });
    }
}
