const express = require('express');
const {getCategories} = require('./controllers/get-categories-controllers');
const { getReviews } = require('./controllers/get-reviews-controllers');

const app = express();

app.get('/api/categories', getCategories);

app.get('/api/reviews', getReviews);

app.all('/*', (req, res) => {
    res.status(404).send({msg: 'End-point Not Found'})
});

module.exports = app;