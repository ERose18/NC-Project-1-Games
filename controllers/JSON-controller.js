const app = require('../app');
const apiJSON = require('../endpoints.json');

function runningServer(request, response){
    response.status(200).send(apiJSON);
}

module.exports = {runningServer}