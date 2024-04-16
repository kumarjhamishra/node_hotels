const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {

    //extract the jwt token from the request headers
    const token = req.headers.authorization.split('')[1];

    //if token not found
    if(!token) return res.status(404).json({error: 'Unauthorised'});

    //token found
    try {
        //verify the JWT token
        //verify function will return the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //attach user information to the request object
        req.user = decoded;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({error : 'Invalid token'});
    }
}

module.exports = jwtAuthMiddleware;