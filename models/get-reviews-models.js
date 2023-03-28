const db = require('../db/connection');
const reviews = require('../db/data/test-data/reviews');
const comments = require('../db/data/test-data/comments');


function fetchReviews(){
    return db.query(`
    SELECT reviews.title , reviews.owner , reviews.review_id , reviews.designer , reviews.review_img_url ,
    reviews.category , reviews.created_at , reviews.votes,
    CAST(COUNT(comments.review_id)AS INT) AS comment_count
    FROM reviews
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id
    GROUP BY reviews.title , reviews.owner , reviews.review_id , reviews.designer , reviews.review_img_url ,
    reviews.category , reviews.created_at , reviews.votes
    ORDER BY reviews.created_at DESC;
    `)
    .then((reviews) => {return reviews.rows})
    .catch((err) => {
        console.log('this is an error', err)
    }
    )
};

  
module.exports = {fetchReviews}
