const db = require('../db/connection');
const reviews = require('../db/data/test-data/reviews');
const comments = require('../db/data/test-data/comments');

function fetchReviewCommentsByID(review_id){
    return db.query(
        `SELECT * FROM comments 
         WHERE review_id = $1
         ORDER BY created_at DESC`, [review_id]
    ).then((result) => {
        return result.rows;
    })

 }

 module.exports = {fetchReviewCommentsByID} 
