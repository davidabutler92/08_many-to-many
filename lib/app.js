const express = require('express');
const Comment = require('./models/Comment');
const app = express();

app.use(express.json());

app.post('/api/v1/comments', (req, res, next) => {
  Comment
    .insert(req.body)
    .then(comment => res.send(comment))
    .catch(next);
    
});

module.exports = app;
