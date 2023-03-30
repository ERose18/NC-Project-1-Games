const db = require('../db/connection');
const reviews = require('../db/data/test-data/reviews');
const comments = require('../db/data/test-data/comments');

function addNewReviewComment(review_id, addedComment){
    const votes = 0;
    const {body, author} = addedComment;
    return db.query(
        `INSERT INTO comments (author, votes, body, review_id)
        VALUES ($1, $2, $3, $4) RETURNING *`, [author, votes, body, review_id]
    ).then((result) => {
        return result.rows[0];
    })

 }

 module.exports = {addNewReviewComment} 
