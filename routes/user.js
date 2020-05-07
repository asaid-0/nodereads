const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }).exec()
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, success) => {
                    if (success) {
                        return res.status(200).json({
                            status: "success",
                            type: "login",
                            message: `User ${user.email} logged in successfuly`
                        });
                    } else {
                        console.log("Eror in hashing compare: ", err);
                        return res.status(401).json({
                            status: "error",
                            type: "login",
                            message: "Authentication failed"
                        })
                    }
                });

            } else {
                console.log("User not found");
                return res.status(401).json({
                    status: "error",
                    type: "login",
                    message: "Authentication failed"
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                status: "error",
                type: "login",
                message: err
            })
        })
});
router.post('/register', (req, res) => {
    const { firstname, lastname, email, password } = req.body
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log("Error: ", err.message);
            return res.status(500).json({
                status: "error",
                type: "hash",
                message: err.message
            });
        }
        else {
            const user = new User({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hash,
                // photo: photo,      
            });
            user.save()
                .then(user => {
                    return res.status(201).json({
                        status: "success",
                        type: "register",
                        message: `User ${user.email} created successfuly`
                    })
                })
                .catch(err => {
                    return res.status(500).json({
                        status: "error",
                        type: "register",
                        message: err
                    })
                })
        }
    })

});




module.exports = router