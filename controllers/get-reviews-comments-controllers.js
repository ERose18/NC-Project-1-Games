const reviews = require('../db/data/test-data/reviews');
const comments = require('../db/data/test-data/comments');
const {fetchReviewsByID} = require('../models/get-reviews-id-models')
const {fetchReviewCommentsByID} = require('../models/get-reviews-comments-models');

function getReviewCommentsByID(request, response, next){
    const {review_id} = request.params;
    const promiseForComment = [fetchReviewCommentsByID(review_id)];

    if(review_id){promiseForComment.push(fetchReviewsByID(review_id))};

    Promise.all(promiseForComment)
    .then(([comments]) => {
        response.status(200).send({comments});
    })
    .catch((err) => {next(err)})
 }

 module.exports = {getReviewCommentsByID}