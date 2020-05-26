const express = require('express');
const AuthorModel = require('../models/Author')
const BookModel = require('../models/Book')
const router = express.Router();

router.get('/', (req, res) => {
    AuthorModel.find({})
        .then(authors => {
            AuthorModel.count().exec((err, count) => {
                if (err) {
                    return res.status(400).send(err);
                }
                res.status(200).json({ count: count, data: authors })
            })
        })
        .catch(err => res.status(400).send(err))
});

router.get('/:id', async (req, res) => {
    try {
        author = await AuthorModel.findById(req.params.id);
        books = await BookModel.find({ author: req.params.id }).populate('author');
        console.log(books)
        res.json({ "author": author, "books": books })
    } catch (error) {
        res.send(error)
    }
});

module.exports = router