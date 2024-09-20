const { signup, signin, googleAuth, logout, getALlUser, getUser } = require('../controllers/auth.js');
const express = require('express');
const { authLocal, authJwt, authorize } = require('../services/auth.js');
const roles = require('../utils/roles.js');

const router = express.Router();

//Create a new user
router.post('/signup', signup);

//Sign in
router.post(
    '/signin',
    authLocal,
    signin
);

router.post(
    '/all-user',
    authJwt,
    authorize([roles.Admin]),
    getALlUser
)

//Google auth
router.post('/google', googleAuth);

//Logout
router.post('/logout', authJwt, authorize([roles.Admin]), logout);

module.exports = router;