const express = require('express');
const AuthorModel = require('../models/Author')
const BookModel = require('../models/Book')
const router = express.Router();

router.get('/:id/books', async (req, res) => {
    try {
        author = await AuthorModel.findById(req.params.id);
        books = await BookModel.find({author:req.params.id});
        res.json({"author":author,"books":books})
    } catch (error) {
        res.send(error)
    }
})

module.exports = router