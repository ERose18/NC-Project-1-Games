const db = require('../db/connection');
const reviews = require('../db/data/test-data/reviews');

function fetchReviews(){
    return db.query('SELECT * FROM reviews')
    .then((reviews) => {return reviews.rows})
};

module.exports = {fetchReviews}