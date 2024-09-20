const { createError } = require("../error");
const User = require("../models/User");
const { sendHttpResponse } = require("../utils/createResponse");

const remove = async (req, res, next) => {
    if (req.user.role === 'admin') {
        try {
            const user = await User.findById(req.params.id);
            
            if (!user) {
                // If no user is found, return account not found
                return sendHttpResponse(res, 'Account not found', {}, 404, false);
            }

            await User.findByIdAndDelete(req.params.id);
            sendHttpResponse(res, 'Account has been deleted', {}, 200, true);
        } catch (error) {
            console.error(
                'Error ---------------------- remove ---------------------- user.js',
                error?.message
            );
            sendHttpResponse(res, 'Failed to delete account', {}, 500, false);
        }
    } else {
        sendHttpResponse(res, 'You can only delete your own account', {}, 403, false);
    }
};



const getUser = async (req, res, next) => {
    try {
        console.log(req.user,'----------------------');
        const { role, name, email, bookmarks } = req.user;   

        sendHttpResponse(res, 'Success', {
            role,
            name,
            email,
            bookmarks
        });
    }
    catch (err) {
        console.error(
            'err ---------------------- getUser ---------------------- user.js',
            err?.message
    )
        sendHttpResponse(res, 'Failed to fetch user Details', {}, 500, false);
    }
}

const bookmarksVideo = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const videoId = req.params.id;

        await User.findByIdAndUpdate(userId, {
            $addToSet: { bookmarks: videoId },
        });

        sendHttpResponse(res, 'Success', 'Video has been bookmarked');
    } 
    catch (error) {
        console.error(
            'Error ---------------------- bookmarksVideo ---------------------- user.js',
            error?.message
        );
        sendHttpResponse(res, 'Failed to bookmark video', {}, 500, false);
    }
};


const unbookmarkVideo = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const videoId = req.params.id;

        await User.findByIdAndUpdate(userId, {
            $pull: { bookmarks: videoId },
        });

        sendHttpResponse(res, 'Success', 'Video has been unbookmarked');
    } 
    catch (error) {
        console.error(
            'Error ---------------------- unbookmarkVideo ---------------------- user.js',
            error?.message
        );
        sendHttpResponse(res, 'Failed to unbookmark video', {}, 500, false);
    }
};


module.exports = { remove, getUser, bookmarksVideo, unbookmarkVideo };