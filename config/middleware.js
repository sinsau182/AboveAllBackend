const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const passport = require('passport');
const compression = require('compression');
const constants = require('./constants.js');
const cookieParser = require('cookie-parser');
const winstonInstance = require('./winston.js');
const expressWinston = require('express-winston');
const methodOverride = require('method-override');
const session = require('express-session');

// const allowedDomains = [constants.ALLOWED_DOMAIN];

module.exports = (app) => {
  app.use(compression());
  app.use(express.json({ limit: '150mb' }));
  app.use(express.urlencoded({ limit: '150mb', extended: true, parameterLimit: 150000 }));
  app.use(helmet());
  app.use(
    cors({
      credentials: true,
      exposedHeaders: ['Authorization'],
      origin: (origin, callback) => {
        // bypass the requests with no origin (like curl requests, mobile apps, etc )
        if (!origin) return callback(null, true);

        // if (allowedDomains.indexOf(origin) === -1) {
        //   const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        //   return callback(new Error(msg), false);
        // }
        return callback(null, true);
      }
    })
  );
  app.use(
    session({
      secret: 'Hilfee',
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(methodOverride());
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
  
  if (constants.isDev) {
    app.use(morgan('dev'));
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(
      expressWinston.logger({
        winstonInstance,
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorStatus: true,
      })
    );
  }
};
