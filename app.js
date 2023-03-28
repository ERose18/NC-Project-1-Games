const {getCategories} = require('./controllers/get-categories-controllers');
const {getReviewsByID} = require('./controllers/get-reviews-id-controller');
const express = require('express');
const { handlePSQL400s, handleCustomError, handle500 } = require('./error-handling');

const app = express();

app.get('/api/categories', getCategories);

app.get('/api/reviews/:review_id', getReviewsByID);

app.use(handlePSQL400s);
app.use(handleCustomError);
app.use(handle500);

app.all('/*', (req, res) => {
    res.status(404).send({msg: 'End-point Not Found'})
});

module.exports = app;