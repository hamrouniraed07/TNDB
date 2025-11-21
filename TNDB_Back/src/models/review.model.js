import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    movie: {
        type : mongoose.Schema.ObjectId,
        ref : "Movie"
    },
    user: {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    review : String,
    createdAt: Date
}, { collection: 'reviews', versionKey: false, _id : false });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
