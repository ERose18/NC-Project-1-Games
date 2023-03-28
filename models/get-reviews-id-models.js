const db = require('../db/connection');
const reviews = require('../db/data/test-data/reviews');

function fetchReviewsByID(reviewId){

    return db.query(`SELECT * FROM reviews WHERE review_id = $1`, [reviewId])
    .then((result) => {
        if(result.rowCount === 0){
            return Promise.reject({status: 404, msg: 'ID Not Found'});
        }
        return result.rows[0]
    })
};

module.exports = {fetchReviewsByID}