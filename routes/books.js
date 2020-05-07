const express = require('express');
const router = express.Router();
const Book  = require('../models/Book');
// router.get('/', (req, res) => {
//     res.send('route get /books');
// })


router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        res.send(books);
    } catch (e) {
        res.send(e);
    }

})



router.get('/:id', (req, res) => {
    const { id } = req.params
    res.send(`route get /books/${id}`);
})

router.post('/:id', (req, res) => {
    const { type } = req.body;
    const { id } = req.params

    if (type === 'review') {
        res.send(`post review /book/${id}`);
    }

    else if (type === 'rate') {
        res.send(`post rate /book/${id}`);
    }

})

router.patch('/:id', (req, res) => {
    const { type } = req.body;
    const { id } = req.params

    if (type === 'review') {
        res.send(`patch review /books/${id}`);
    }

})

router.delete('/:id', (req, res) => {
    const { type } = req.body;
    const { id } = req.params

    if (type === 'review') {
        res.send(`delete review /books/${id}`);
    }

})

module.exports = router