const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        req.userId = decoded.id;
        console.log('DECODED,', decoded)
        next();
    });
};

const verifyModerator = (req, res, next) => {
    // For Check if Token has Moderator Role Which is as Teacher
    let token = req.headers['x-access-token'];
    console.log('token_from_web', token)

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }

        if(decoded.role == "user"){
            return res.status(401).send({
                message: "Access Denied!", 
            });
        }
        
        
        next();
    });

}
const verifyAdmin = (req, res, next) => {
    // For Check if Token has Moderator Role Which is as admin
    let token = req.headers['x-access-token'];
    console.log('token_from_web', token)

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }

        if(decoded.role == "user"){
            return res.status(401).send({
                message: "Access Denied!",
            });
        }

        
        next();
    });

}


const authJwt = {
    verifyToken,
    verifyModerator,
    verifyAdmin,
};

module.exports = authJwt;