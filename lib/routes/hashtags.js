const { Router } = require('express');
const Hashtag = require('../models/Hashtag');

module.exports = Router()
  .post('/', (req, res, next) => {
    Hashtag
      .insert(req.body)
      .then(hashtag => res.send(hashtag))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Hashtag
      .findAll()
      .then(hashtag => res.send(hashtag))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Hashtag
      .findById(req.params.id)
      .then(hashtag => res.send(hashtag))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Hashtag
      .update(req.params.id)
      .then(hashtag => res.send(hashtag))
      .catch(next);
  });
