// index.js
const { Router } = require('express');
const HTTPStatus = require('http-status');

// Import APIError and RequiredError correctly
const { APIError } = require('../services/error.js');
const logErrorService = require('../services/logs.js');

const userRoutes = require('./users.js');
const videoRoutes = require('./video.js');
const authRoutes = require('./auth.js');
const messageRoutes = require('./messages.js');
const categoryRoutes = require('./category.js');

const routes = new Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/videos', videoRoutes);
routes.use('/messages', messageRoutes);
routes.use('/category', categoryRoutes);

routes.all('*', (req, res, next) =>
  next(new APIError('Route Not Found!', HTTPStatus.NOT_FOUND, true))
);

routes.use(logErrorService);

module.exports = routes;
