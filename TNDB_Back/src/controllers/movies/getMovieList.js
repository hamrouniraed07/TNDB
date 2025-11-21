import mongoose from "mongoose"
import Movie from "../../models/movie.model"


export async function getMovieList(req, res) {
    try {

        const movies = await Movie.find({}).populate('category');
        return res.status(200).json({movies});

    } catch (error) {
        return res.status(500).json({message : "unknown error occured"});
    }
}