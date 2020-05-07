const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');
const User = require('../models/User');


router.get('/', async (req, res) => {
    try {
        let searchWord = req.query.searchWord;
        let books = await Book.find({ title: new RegExp(searchWord, 'i') });
        let authors = await Author.find({
            $or: [{ title: new RegExp(searchWord, 'i') },
            { lastname: new RegExp(searchWord, 'i') }]
        });

        res.send(books);

    } catch (e) {
        res.send(e);
    }

})

router.get('/books', async (req, res)=>{
    console.log("current_user: ", req.currentUser);
    const users = await User.find({});
    res.send(users);
})

module.exports = router