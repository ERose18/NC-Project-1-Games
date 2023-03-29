const {getCategories} = require('./controllers/get-categories-controllers');
const {getReviewsByID} = require('./controllers/get-reviews-id-controller');
const { getReviews } = require('./controllers/get-reviews-controllers');
const {getReviewCommentsByID} = require('./controllers/get-reviews-comments-controllers');
const express = require('express');
const { handlePSQL400s, handleCustomError, handle500 } = require('./error-handling');

const app = express();

app.get('/api/categories', getCategories);

app.get('/api/reviews/:review_id', getReviewsByID);

app.get('/api/reviews', getReviews);

app.get('/api/reviews/:review_id/comments', getReviewCommentsByID);

app.all('/*', (req, res) => {
    res.status(404).send({msg: 'End-point Not Found'})
});

app.use(handlePSQL400s);
app.use(handleCustomError);
app.use(handle500);


module.exports = app;