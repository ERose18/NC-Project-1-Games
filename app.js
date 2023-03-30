const {getCategories} = require('./controllers/get-categories-controllers');
const {getReviewsByID} = require('./controllers/get-reviews-id-controller');
const { getReviews } = require('./controllers/get-reviews-controllers');
const {getReviewCommentsByID} = require('./controllers/get-reviews-comments-controllers');
const {postNewCommentInfo} = require('./controllers/post-reviews-comments-controllers');
const {patchOldVotes} = require('./controllers/patch-reviews-controllers');
const {deleteUnwantedComment} = require('./controllers/delete-comment-controller');
const  {getUsers} = require('./controllers/get-users-controllers');
const express = require('express');
const { handlePSQL400s, handleCustomError, handle500 } = require('./error-handling');

const app = express();

app.use(express.json());

app.get('/api/categories', getCategories);

app.get('/api/reviews/:review_id', getReviewsByID);

app.get('/api/reviews', getReviews);

app.get('/api/reviews/:review_id/comments', getReviewCommentsByID);

app.post('/api/reviews/:review_id/comments', postNewCommentInfo);

app.patch('/api/reviews/:review_id', patchOldVotes);

app.delete('/api/comments/:comment_id', deleteUnwantedComment);

app.get('/api/users', getUsers);

app.all('/*', (req, res) => {
    res.status(404).send({msg: 'End-point Not Found'})
});

app.use(handlePSQL400s);
app.use(handleCustomError);
app.use(handle500);


module.exports = app;