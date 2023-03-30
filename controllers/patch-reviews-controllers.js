const reviews = require('../db/data/test-data/reviews');
const comments = require('../db/data/test-data/comments');
const {patchVotes} = require('../models/patch-reviews-models');

function patchOldVotes(request, response, next){
    const {new_votes} = request.body;
    const {review_id} = request.params;
    
    patchVotes(new_votes, review_id)
    .then((review) => {
        response.status(200).send({review});
    })
    .catch((err) => {next(err)})
 }

 module.exports = {patchOldVotes}

