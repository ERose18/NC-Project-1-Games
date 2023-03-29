const reviews = require('../db/data/test-data/reviews');
const {fetchReviews} = require('../models/get-reviews-models');


function getReviews(require, response, next){
    return fetchReviews()
    .then((reviews) => {
    response.status(200).send({reviews: reviews})
 })
}

  
module.exports = {getReviews}