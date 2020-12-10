const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/comments', require('./routes/comments'));

app.use('/api/v1/hashtags', require('./routes/hashtags'));

module.exports = app;
