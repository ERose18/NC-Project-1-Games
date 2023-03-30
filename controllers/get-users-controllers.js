const reviews = require('../db/data/test-data/reviews');
const {fetchUsers} = require('../models/get-users-model');


function getUsers(require, response, next){
    return fetchUsers()
    .then((users) => {
    response.status(200).send({users: users})
 })
}

  
module.exports = {getUsers}