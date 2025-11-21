import Movie from "../../models/movie.model"
import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import mongoose from "mongoose";
import shell from '../../utils/shell'

export async function addMovie(req, res) {
    try {
        const body = {
            title: req.body.title,
            director: req.body.director,
            duration: req.body.duration,
            category: req.body.category,
            description: req.body.description,
            trailer: req.body.trailer,
            outDate: req.body.outDate
        }

        // validation
        const BodySchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string(),
            duration: Joi.number(),
            director: Joi.string(),
            category: Joi.string(),
            trailer: Joi.string(),
            outDate : Joi.date()
        });

        const { error } = BodySchema.validate(body);
        if (error && error.details) {
            console.log(error.details)
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'invalid_input_data' });
        }


        const movie = await Movie.findOne({ title: body.title });

        if (movie)
            return res.status(HttpStatus.CONFLICT).json({ message: 'movie_already_exists' });

        const movieId =  new mongoose.Types.ObjectId();
        const file = req.files.coverPicture[0];

        // console.log(Object.entries(file));
        const coverPicturePath = `static/movies/${movieId}.${file.mimetype.split('/')[1]}`;

        const tempPath = `src/uploads/tmp/${file.originalname.split('.')[0]}.${file.mimetype.split('/')[1]}`

        await shell.exec(`mv ${tempPath} ${coverPicturePath}`);
        await shell.exec(`rm -f ${tempPath}`)

        const newMovie = {
            _id : movieId,
            title: body.title,
            director: body.director,
            description: body.description,
            duration: body.duration,
            category: new mongoose.Types.ObjectId(body.category),
            trailer: body.trailer,
            coverPicture: coverPicturePath,
            outDate: body.outDate,
            createdAt : new Date()
        }

        await Movie.create(newMovie);

        return res.status(HttpStatus.CREATED).json({ success: true });

    } catch (error) {
        console.log(error)
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'unknown_error_occurred' });
    }
}