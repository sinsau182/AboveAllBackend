const Video = require("../models/Video");
const User = require("../models/User");

const addVideo = async (req, res, next) => {
    const newVideo = new Video({ ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    }
    catch (error) {
        next(error);
    }
}

const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return res.status(404).json("Video not found");

        const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedVideo);
        
    }
    catch (error) {
        next(error);
    }
}

const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return res.status(404).json("Video not found");
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("Video has been deleted");
    }
    catch (error) {
        next(error);
    }
}

const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    }
    catch (error) {
        next(error);
    }
}

const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    }
    catch (error) {
        next(error);
    }
}


const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: { $in: tags } });
        res.status(200).json(videos);
    }
    catch (error) {
        next(error);
    }
}

const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({$or: [
            { title: { $regex: query, $options: "i" } },
            { desc: { $regex: query, $options: "i" } },
            { tags: { $regex: query, $options: "i" } },
            { author: { $regex: query, $options: "i" } },
        ]}).limit(40);
        res.status(200).json(videos);
    }
    catch (error) {
        next(error);
    }
}

module.exports = { addVideo, updateVideo, deleteVideo, getVideo, random, getByTag, search };