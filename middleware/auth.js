const jwt = require('jsonwebtoken');
const User = require('../models/User');


// helper function
const isLogged = (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || "NOJWTKEY");
        return payload;
    } catch (error) {
        return false;
    }
};

// Verify that user is logged in middleware
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    currentUser = isLogged(token.split(" ")[1]);
    if (currentUser) {
        req.currentUser = currentUser;
        next();
    }
    else return res.status(401).json({
        status: "error",
        type: "auth",
        message: "Authentication failed"
    });
}

// Verify that it's logged in and is admin middleware
const admin = (req, res, next) => {
    const token = req.headers.authorization;
    currentUser = isLogged(token.split(" ")[1]);
    if (currentUser) {
        req.currentUser = currentUser;
        User.findOne({ email: currentUser.email }).exec()
            .then(user => {
                if (user) {
                    if (user.isAdmin) next();
                    else {
                        return res.status(401).json({
                            status: "error",
                            type: "auth",
                            message: "Authorization failed"
                        })
                    }

                } else {
                    console.log("User not found");
                    return res.status(401).json({
                        status: "error",
                        type: "auth",
                        message: "Authentication failed"
                    })
                }
            })
            .catch(err => {
                return res.status(500).json({
                    status: "error",
                    type: "auth",
                    message: err
                })
            })
    }
    else return res.status(401).json({
        status: "error",
        type: "auth",
        message: "Authentication failed"
    });

}

module.exports = {
    auth,
    admin
}