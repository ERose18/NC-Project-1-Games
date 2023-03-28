exports.handlePSQL400s =(err, request, response, next) => {
    if(err.code === '22P02'){
        response.status(400).send({msg: 'Invalid ID'});
    } else {
        next(err);
    }
};

exports.handleCustomError = (err, request, response, next) => {
    const {status, msg} = err;
    if(status && msg){
        response.status(status).send({msg});
    } else {
        next(err);
    }
};

exports.handle500 = (err, request, response, next) => {
    console.log(err);
    response.status(500).send({msg: 'A Server Error Has Occurred'});
}