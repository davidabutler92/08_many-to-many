const { Router } = require('express');
const Hashtag = require('../models/Hashtag');

module.exports = Router()
  .post('/', (req, res, next) => {
    Hashtag
      .insert(req.body)
      .then(hashtag => res.send(hashtag))
      .catch(next);
  });
