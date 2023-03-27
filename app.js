const {getCategories} = require('./controllers/get-categories-controllers');
const express = require('express');

const app = express();

app.get('/api/categories', getCategories);


app.all('/*', (req, res) => {
    res.status(404).send({msg: 'End-point Not Found'})
});

module.exports = app;