const categories = require('../db/data/test-data/categories');
const {fetchCategories} = require('../models/get-categories-models');

function getCategories(require, response, next){
   return fetchCategories()
   .then((categories) => {
    response.status(200).send({categories: categories})
   })
   .catch((err) => {
    res.status(404).send({msg: 'End-point Not Found'})
   })
}

module.exports = {getCategories}