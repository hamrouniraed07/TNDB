import mongoose from "mongoose"
import Category from "../../models/category.model"


export async function createCategories(req, res) {
    try {
        [
            "Action",
            "Comedy",
            "Drama",
            "Fantasy",
            "Horror",
            "Mystery",
            "Romance",
            "Thriller",
            "Western",
        ].map(async (el) => {
            const newCategory = {
                _id : new mongoose.Types.ObjectId(),
                value: el
            }

            await Category.create(newCategory);
        })


        return res.status(200).json({success :true});

    } catch (error) {
        return res.status(500).json({message : "unknown error occured"});
    }
}