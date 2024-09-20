const { remove, getUser, bookmarksVideo, unbookmarkVideo} = require('../controllers/user.js');
const express = require('express');
const {authJwt, authorize} = require('../services/auth.js');
const roles = require('../utils/roles.js');

const router = express.Router();

//delete user
router.delete('/:id', authJwt, authorize([roles.Admin]), remove);


//get user
router.get('/details', authJwt, getUser);


//bookmark video
router.put('/bookmark/:id', authJwt, bookmarksVideo);

//unbookmark video
router.put('/unbookmark/:id', authJwt, unbookmarkVideo);

module.exports = router;