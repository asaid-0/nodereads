const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');
const User = require('../models/User');
const mongoose = require('mongoose');


// @route   GET /
// @desc    Search result from NavBar 
// @access  Private - user
router.get('/', async (req, res) => {

    try {
        const searchWord = req.query.searchWord;
        const books = Book.find({ name: new RegExp(searchWord, 'i') }).populate("author");
        const authors = Author.find({
            $or: [{ firstname: new RegExp(searchWord, 'i') },
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
    const { currentUser } = req
    // console.log(currentUser);
    try {
        const { filter, offset, limit } = req.query;
        const beginIndex = limit * (offset - 1);
        const endIndex = parseInt(limit * (offset - 1)) + parseInt(limit);
        const { books } = await User.findById(req.currentUser._id).populate({
            path: 'books.book',
            model: 'Book',
            populate: {
                path: 'author',
                model: 'Author'
            }
        });
        // const { books } = await User.findById(mongoose.Types.ObjectId("5eb3ae2e2c6ca55e7142efde"))
        // .populate('books.book').populate('books.book.author');
        let userBooks = books; // Question
        if (filter) {
            userBooks = books.filter((book) => {
                return book.shelf === filter;
            })
        }
        // res.send(userBooks.slice(beginIndex, endIndex));
        res.send({
            userBooks: userBooks.slice(beginIndex, endIndex),
            BooksCount: userBooks.length
        });
    } catch (error) {
        res.status(500).send({ msg: "Sorry, Server Error" });
    }
})

router.get('/books/:id', async (req, res) => {
    const { currentUser } = req
    const { id } = req.params
    try {
        const { books } = await User.findById(currentUser._id).populate('books.book')
        const book = books.find((book) => book.book._id == id)
        if (book)
            res.send(book);
        else
            res.status(404).send({ err: "No book" });

    } catch {
        res.status(500).send({ err: "Server error" });
    }
})

module.exports = router