const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const bearerAuthorizationHeader = req.headers['authorization'];
    const bearerToken = bearerAuthorizationHeader.split(' ')[1];
    if (bearerToken !== undefined) {
        jwt.verify(bearerToken, 'secret', (err, authData) => {
            if (err){
                res.status(401).json('unauthorized');
            }
        })
        next();
    } else {
        res.status(403).json('unauthorized');
    }
}
module.exports = verifyToken;
