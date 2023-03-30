const reviews = require('../db/data/test-data/reviews');
const comments = require('../db/data/test-data/comments');
const {deleteCommentByID} = require('../models/delete-comment-model');

function deleteUnwantedComment(request, response, next){
    const {comment_id} = request.params;

    deleteCommentByID(comment_id)
    .then((comment) => {
        response.sendStatus(204)
    })
    .catch((err) => {next(err)})
 }

 module.exports = {deleteUnwantedComment}

