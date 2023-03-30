 const reviews = require('../db/data/test-data/reviews');
 const comments = require('../db/data/test-data/comments');
 const {fetchReviewsByID} = require('../models/get-reviews-id-models');
 const {addNewReviewComment} = require('../models/post-reviews-comments-models');
 
 function postNewCommentInfo(request, response, next){
     const {review_id} = request.params;
     const addedComment = request.body;

     addNewReviewComment(review_id, addedComment)
     .then((comments) => {
         response.status(201).send({comments});
     })
     .catch((err) => {next(err)})
  }
 
  module.exports = {postNewCommentInfo}

