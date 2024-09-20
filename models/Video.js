const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },  
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model('Video', VideoSchema);