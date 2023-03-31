const db = require('../db/connection');
const categories = require('../db/data/test-data/categories');
const reviews = require('../db/data/test-data/reviews');

function fetchQueries(category, sortBy = 'created_at', order = 'DESC'){
    const sortByVals = ['votes', 'created_at'];
    const orderVals = ['ASC', 'DESC'];

    if(!sortByVals.includes(sortBy)){
        return Promise.reject({msg: 'Invalid Sort Query', status: 400});
    }
    if(!orderVals.includes(order)){
        return Promise.reject({msg: 'Invalid Order', status: 400});
    }

    let query = ` SELECT reviews.title , reviews.owner , reviews.review_id , reviews.designer , reviews.review_img_url ,
                    reviews.category , reviews.created_at , reviews.votes,
                    CAST(COUNT(comments.review_id)AS INT) AS comment_count
                    FROM reviews 
                    LEFT JOIN comments
                    ON reviews.review_id = comments.review_id
                    GROUP BY reviews.review_id`;

    newCategory = category ? ` HAVING reviews.category = $1` : "";
    
    const binding = [];
    if(category){binding.push(category)};
    
    query += newCategory;

    newOrder = ` ORDER BY reviews.${sortBy} ${order};`;
    query += newOrder;

    return db.query(query, binding)
    .then((result) => {return result.rows;})
};

module.exports = {fetchQueries}