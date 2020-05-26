const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CategoryModel = require("../models/Category");
const BookModel = require("../models/Book");
const upload = require('../middleware/multer')
const _ = require('lodash')

const generateToken = (id, email, isAdmin) => {
    return jwt.sign({
        _id: id,
        email: email,
        isAdmin: isAdmin
    }, process.env.JWT_SECRET_KEY || "NOJWTKEY", {
        expiresIn: "4h"
    });
}


router.get("/categories", async (req, res) => {
    try {
        // categories = await CategoryModel.find({}).populate("books").exec();
        categories = await CategoryModel.find({}).exec();
        res.send(categories);
    } catch (error) {
        res.status(200).json(error);
    }
});

router.get("/categories/:id", (req, res) => {
    const limit = 8;
    let page = 0;
    if (req.query.page >= 1) {
        page = req.query.page;
    }
    // check first if category exists
    CategoryModel.findById(req.params.id)
        .then(category => {
            //find books has category in their categories list
            BookModel.find({ categories: { "$in" : [category]} })
                .populate("author")
                .skip(limit * page)
                .limit(limit)
                .then(books => {
                    BookModel.count().exec((err, count) => {
                        if (err) {
                            return res.status(400).send(err);
                        }
                        return res.status(200).json({ count: count, pages: Math.ceil(count / limit), data: books })
                    })
                })
                .catch(err => res.status(400).json({
                    status: "error",
                    type: "books",
                    message: "can't find books by category",
                    "error": err
            }));
        })
        .catch(err => res.status(400).json({
                status: "error",
                type: "category",
                message: "can't find category",
                "error": err
        }));
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }).exec()
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, success) => {
                    if (success) {
                        const token = generateToken(user._id, user.email, user.isAdmin);
                        return res.status(200).json({
                            status: "success",
                            type: "login",
                            message: `User ${user.email} logged in successfuly`,
                            token: token
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

router.post('/register', upload.single('userPhoto'), (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    // const photo = req.file;
    const photoPath = _.get(req, 'file.path')
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
                isAdmin: false,
                photo: photoPath,  
            });
            user.save()
                .then(user => {
                    const token = generateToken(user._id, user.email, user.isAdmin);
                    return res.status(201).json({
                        status: "success",
                        type: "register",
                        message: `User ${user.email} created successfuly`,
                        token: token
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