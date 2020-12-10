const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/v1/comments', (req, res, next) => {
  console.log(req.body);
});

module.exports = app;
