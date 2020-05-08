const express = require('express');
const AuthorModel = require('../models/Author')
const router = express.Router();

router.get('/:id/books', async (req, res) => {
    try {
        author = await AuthorModel.findById(req.params.id).populate("books").exec()
        res.json(author)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router