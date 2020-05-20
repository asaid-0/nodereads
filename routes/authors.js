const express = require('express');
const AuthorModel = require('../models/Author')
const BookModel = require('../models/Book')
const router = express.Router();

router.get('/', (req, res) => {
    const limit = 8;
    let page = 0;
    console.log(req.query);
    if (req.query.page >= 1) {
        page = req.query.page;
    }
    AuthorModel.find({})
        .skip(limit * page)
        .limit(limit)
        .then(authors => {
            AuthorModel.count().exec((err, count) => {
                if (err) {
                    return res.status(400).send(err);
                }
                res.status(200).json({ pages: Math.ceil(count / limit), data: authors })
            })
        })
        .catch(err => res.status(400).send(err))
});

router.get('/:id/books', async (req, res) => {
    try {
        author = await AuthorModel.findById(req.params.id);
        books = await BookModel.find({ author: req.params.id });
        res.json({ "author": author, "books": books })
    } catch (error) {
        res.send(error)
    }
});

module.exports = router