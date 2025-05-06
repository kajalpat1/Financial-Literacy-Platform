
module.exports.notFound = (req, res, next) => {
    const err = new Error('Not found');
    err.status = 404; //give it an error code

    next(err);
};



module.exports.errors = (err, red, res, next) => {
    res.status(err.status || 500).json({
        err: err.message || 'Something went wrong'
    });
};
