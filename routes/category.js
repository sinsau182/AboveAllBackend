const { createCategory, getCategories, deleteCategory } = require('../controllers/category');
const express = require('express');
const {authJwt, authorize} = require('../services/auth.js');
const roles = require('../utils/roles.js');

const router = express.Router();

//create category
router.post('/', authJwt, authorize([roles.Admin]), createCategory);

router.delete('/:id', authJwt, authorize([roles.Admin]), deleteCategory);

router.get('/all', getCategories);

module.exports = router;