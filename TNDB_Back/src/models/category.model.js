import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    value: String
}, { collection: 'categories', versionKey: false, _id : false });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
