const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        maxLength: 10
    },
    company: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Message', MessageSchema);