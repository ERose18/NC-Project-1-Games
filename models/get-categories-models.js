const db = require('../db/connection');
const categories = require('../db/data/test-data/categories');

function fetchCategories(){
    return db.query('SELECT * FROM categories')
    .then((categories) => {return categories.rows})
};

module.exports = {fetchCategories}