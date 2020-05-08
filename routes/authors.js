const express = require('express');
const AuthorModel = require('../models/Author')
const router = express.Router();

router.get('/:id/books', (req, res) => {
    try {
        author = AuthorModel.findById(req.params.id).populate("books").exec()
        res.json(author)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router