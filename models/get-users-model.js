const db = require('../db/connection');
const reviews = require('../db/data/test-data/reviews');
const comments = require('../db/data/test-data/comments');


function fetchUsers(){
    return db.query(`
    SELECT *
    FROM users
    `)
    .then((users) => {return users.rows})
};

  
module.exports = {fetchUsers}
