const reviews = require('../db/data/test-data/reviews');
const {fetchReviewsByID} = require('../models/get-reviews-id-models');

function getReviewsByID(require, response, next){
    const {review_id} = require.params;
    fetchReviewsByID(review_id)
    .then((reviews) => {
     response.status(200).send({reviews: reviews})
    })
    .catch((err) => {
        next(err);
    })
 };

module.exports = {getReviewsByID}