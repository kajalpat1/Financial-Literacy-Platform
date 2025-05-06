const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.headers['authorization']) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {  //check header for autherization key
                next(Error('Failed to autheticate token'));
            } //verify if token is actual token
            else {
                req.decoded = decoded; //decoded onto request object
                next();
            }
        });
        
    } else {
        next(Error('No token provided'));
    }
}