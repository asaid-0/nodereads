const express = require('express');
const BookModel = require('../models/Book')

const router = express.Router();

router.get('/', (req, res) => {
    // res.send('route get /books');
    BookModel.find({})
        .then(books => res.json(books))
        .catch(err => res.send(err))
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    // res.send(`route get /books/${id}`);
    BookModel.findById(id)
        .then(book => res.json(book))
        .catch(err => res.send(err))

})

router.post('/:id', (req, res) => {
    const { type, userID } = req.body;
    const { id } = req.params


    if (type === 'review') {
        // res.send(`post review /book/${id}`);
        const { reviewContent } = req.body
        const review = {
            user: userID,
            content: reviewContent,
        }
        BookModel.findById(id)
            .then(book => {
                book.review.push(review)
                book.save()
                res.json(book)
            })
            .catch(err => res.send(err))
    }

    else if (type === 'rate') {
        // res.send(`post rate /book/${id}`);
        const { rate } = req.body
        const userRate = {
            user: userID,
            rate
        }
        BookModel.findById(id)
            .then(book => {
                book.rate.push(userRate)
                book.save()
                res.json(book)
            })
            .catch(err => res.send(err))
    }
})

router.patch('/:id', (req, res) => {
    const { type, userID } = req.body;
    const { id } = req.params

    if (type === 'review') {
        // res.send(`patch review /books/${id}`);
        const { reviewID, newContent } = req.body;
        BookModel.findById(id)
            .then(book => {
                const userReview = book.review.filter(review => {
                    return review._id.toString() === reviewID && review.user.toString() === userID
                })
                res.json(userReview)
            })
            .catch(err => res.send(err))

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