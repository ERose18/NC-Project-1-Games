const db = require('../db/connection');
const reviews = require('../db/data/test-data/reviews');
const comments = require('../db/data/test-data/comments');

function patchVotes(new_votes, review_id){
    return db.query(
        `UPDATE reviews
        SET votes = votes + $1
        WHERE review_id = $2
        RETURNING *;
        `, [new_votes, review_id]
    ).then((result) => {
        return result.rows[0];
    })

 }

 module.exports = {patchVotes} 
