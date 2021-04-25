const express = require('express');
const router = express.Router();
const images = require('../routes/images');

module.exports = app => {
  app.use(express.json());

  router.use('/images', images);


  app.use('/api', router);
}