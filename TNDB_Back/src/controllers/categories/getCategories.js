import mongoose from "mongoose"
import Category from "../../models/category.model"


export async function getCategories(req, res) {
    try {

        const categories = await Category.find({});
        return res.status(200).json({categories});

    } catch (error) {
        return res.status(500).json({message : "unknown error occured"});
    }
}