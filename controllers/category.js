const Category = require("../models/Category");

const createCategory = async (req, res, next) => {
    const newCategory = new Category({ ...req.body });
    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        next(error);
    }
};

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category) return res.status(404).json("Category not found");
            await Category.findByIdAndDelete(req.params.id);
            res.status(200).json("Category has been deleted");
    }
    catch (error) {
        next(error);
    }
};

module.exports = { createCategory, getCategories, deleteCategory };