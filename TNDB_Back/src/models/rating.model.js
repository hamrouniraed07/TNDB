import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    movie: {
        type : mongoose.Schema.ObjectId,
        ref : "Movie"
    },
    user: {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    rating : Number,
    createdAt: Date
}, { collection: 'ratings', versionKey: false, _id : false });

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
