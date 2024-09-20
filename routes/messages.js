const { addMessage, deleteMessage, getMessage, getAllMessages } = require('../controllers/message.js');
const express = require('express');
const {authJwt, authorize} = require('../services/auth.js');
const roles = require('../utils/roles.js');

const router = express.Router();

//create message
router.post('/', addMessage);

router.delete('/:id', authJwt, authorize([roles.Admin]), deleteMessage);

// Not used in the front-end, but may be useful for future development
router.get('/find/:id', authJwt, authorize([roles.Admin]), getMessage); 

router.get('/all', authJwt, authorize([roles.Admin]), getAllMessages);


module.exports = router;