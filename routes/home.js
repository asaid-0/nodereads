const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');
const User = require('../models/User');


// @route   GET /
// @desc    Search result from NavBar 
// @access  Private - user
router.get('/', async (req, res) => {
    try {
        const searchWord = req.query.searchWord;
        const books = Book.find({ title: new RegExp(searchWord, 'i') });
        const authors = Author.find({
            $or: [{ title: new RegExp(searchWord, 'i') },
            { lastname: new RegExp(searchWord, 'i') }]
        });
        const result = await Promise.all([books, authors]);
        res.send(result);
    } catch (e) {
        res.status(500).send({ msg: "Sorry, Server Error" });
    }

})


// @route   GET /books
// @desc    Home all or filtered (want to read - reading - read ) books 
// @access  Private - user
router.get('/books', async (req, res) => {
    try {
        const { filter, offset, limit } = req.query;
        const beginIndex = limit * (offset - 1);
        const endIndex = parseInt(limit * (offset - 1)) + parseInt(limit);
        // console.log({ beginIndex, endIndex });
        const { books } = await User.findById(req.currentUser._id).populate('books.book');
        const userBooks = books;
        if (filter) {
            userBooks = books.filter((book) => {
                return book.shelf === filter;
            })
        }
        res.send(userBooks.slice(beginIndex, endIndex));
    } catch (error) {
        res.status(500).send({ msg: "Sorry, Server Error" });
    }
})

module.exports = router