const Message = require("../models/Messages");

const addMessage = async (req, res, next) => {
    const newMessage = new Message({ ...req.body });
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }
    catch (error) {
        next(error);
    }
}

const deleteMessage = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id);
        if(!message) return res.status(404).json("Message not found");
            await Message.findByIdAndDelete(req.params.id);
            res.status(200).json("Message has been deleted");
    }
    catch (error) {
        next(error);
    }
}

const getMessage = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id);
        res.status(200).json(message);
    }
    catch (error) {
        next(error);
    }
}

const getAllMessages = async (req, res, next) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    }
    catch (error) {
        next(error);
    }
}

module.exports = { addMessage, deleteMessage, getMessage, getAllMessages };