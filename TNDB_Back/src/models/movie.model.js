import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    title : String,
    director : String,
    duration : Number,
    trailer : String,
    description : String,
    coverPicture : String,
    category : {
        type : mongoose.Schema.ObjectId,
        ref : "Category"
    },
    outDate : Date,
    createdAt: Date
}, { collection: 'movies', versionKey: false, _id : false });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
