const { Router } = require('express');
const Comment = require('../models/Comment');

module.exports = Router()
  .post('/', (req, res, next) => {
    Comment
      .insert(req.body)
      .then(comment => res.send(comment))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Comment
      .findAll()
      .then(comment => res.send(comment))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Comment 
      .findById(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  });
