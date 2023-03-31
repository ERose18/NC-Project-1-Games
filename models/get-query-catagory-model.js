const db = require('../db/connection');
const categories = require('../db/data/test-data/categories');

function fetchCategoriesByName(categoryName){
    return db.query('SELECT * FROM categories WHERE slug = $1', [categoryName])
    .then((categories) => {if(categories.rows.length === 0){
        return Promise.reject({msg: 'Invalid Category', status: 404})
    }})
};

module.exports = {fetchCategoriesByName}