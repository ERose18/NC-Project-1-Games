const db = require('../db/connection');
const reviews = require('../db/data/test-data/reviews');
const comments = require('../db/data/test-data/comments');

function deleteCommentByID(comment_id){
    return db.query(
        `DELETE FROM comments
        WHERE comment_id = $1
        RETURNING *;
        `, [comment_id]
    ).then((result) => {
        return result.rows[0];
    })

 }

 module.exports = {deleteCommentByID} 
