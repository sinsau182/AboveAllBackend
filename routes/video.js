const { addVideo, updateVideo, deleteVideo, getVideo, random, getByTag, search } = require('../controllers/video.js');
const express = require('express');
const {authJwt, authorize}  = require('../services/auth.js')
const roles = require('../utils/roles.js');

const router = express.Router();

//create video
router.post('/', authJwt, authorize([roles.Admin]), addVideo); 

router.delete('/:id', authJwt, authorize([roles.Admin]), deleteVideo);

router.get('/find/:id', getVideo)

router.get('/random', random);
router.get('/tags', getByTag);
router.get('/search', search);


module.exports = router;