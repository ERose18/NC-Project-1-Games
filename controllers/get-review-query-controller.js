const categories = require('../db/data/test-data/categories');
const reviews = require('../db/data/test-data/reviews');
const {fetchCategoriesByName} = require('../models/get-query-catagory-model');
const {fetchQueries} = require('../models/get-review-query-model');

function getQueries(request, response, next) {
    const {category, sort_by, order} = request.query;
    const promise = [fetchQueries(category, sort_by, order)];

    if(category){promise.push(fetchCategoriesByName(category))};

    Promise.all(promise)
    .then(([reviews]) => {
        response.status(200).send({reviews})
    })
    .catch((err) => {
        next(err);
    })
}

module.exports = {getQueries}