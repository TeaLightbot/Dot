'use strict';
﻿module.exports = function(app) {
  app.use(require('cookie-parser')());
  app.use(require('body-parser').json({ limit: '50mb' }));
  app.use(require('body-parser').urlencoded({ limit: '50mb', extended: true }));
  app.use(require('express-session')({
    secret: '12345789QWERTY', resave: true,
    saveUninitialized: true
  }));
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
};
