const express = require('express');
const mongoose = require('mongoose');
const BookModel = require('../models/Book')
const UserModel = require('../models/User')

const router = express.Router();


/////////////////////**** retrieve all books ****/////////////////////

router.get('/', (req, res) => {

    BookModel.find({})
        .populate('author')
        .then(books => res.status(200).json(books))
        .catch(err => res.status(400).send(err))
})

/////////////////////**** retrieve book info ****/////////////////////

router.get('/:id', (req, res) => {
    const { id } = req.params
    // res.send(`route get /books/${id}`);
    BookModel.findById(id)
        .populate('author')
        .populate('reviews.user')
        .then(book => res.status(200).json(book))
        .catch(err => res.status(400).send(err))

})


/////////////////////**** submit review, rate, add to shelve ****/////////////////////

router.post('/:id', (req, res) => {

    const { type } = req.body;
    const { id } = req.params
    const { currentUser } = req

    /////// submit review
    if (type === 'review') {

        const { content } = req.body
        if (!content.trim()) return res.json({ error: 'review content required' })

        const review = {
            // user: currentUser,
            user: "5eb4628d746f7c3026426730",
            content,
        }

        BookModel.findById(id)
            .populate('reviews.user')
            .then(book => {
                // check if user submitted review before
                const oldReview = book.reviews.find(review => review.user._id.toString() === "5eb4628d746f7c3026426730")//currentUser._id
                // console.log(oldReview);

                if (!oldReview) {

                    book.reviews.push(review)
                    book.save()
                        .then(book => {
                            // console.log(book);

                            res.status(200).json(book.reviews)
                        })
                        .catch(err => {
                            console.log(err);

                            res.status(400).send(err)
                        })

                } else return res.json({ error: 'review already exist' })
            })
            .catch(err => res.send(err))
    }

    /////// submit rate
    else if (type === 'rate') {
        const { rate } = req.body
        const { currentUser } = req
        if (!rate || typeof (rate) != 'number') res.status(400).send('Invalid rate')

        const userRate = {
            // user: currentUser,
            user: "5eb4628d746f7c3026426730",
            rate,
        }

        BookModel.findById(id)
            .populate('author')
            .then(book => {
                // check if user submitted rate before
                const oldRate = book.rates.find(rate => rate.user.toString() === "5eb4628d746f7c3026426730")//currentUser._id

                if (!oldRate) {
                    book.rates.push(userRate)
                    book.save()
                        .then(book => res.status(200).json(book.rates.slice(-1)[0]))
                        .catch(err => res.status(400).send(err))
                }
                // Edit rate
                else {

                    const newRate = book.rates.id(oldRate._id);
                    newRate.rate = rate
                    book.save()
                        .then(book => res.status(200).json(newRate))
                        .catch(err => res.status(400).send(err))

                }
            })
            .catch(err => res.status(400).send(err))
    }

    //////// add to shelve
    else if (type === 'shelf') {
        const { shelf } = req.body
        UserModel.findOneAndUpdate({ _id: currentUser._id, "books.book": id },
            { "books.$.shelf": shelf },
            { new: true },
            (err) => {
                if (err) res.send(err)
                res.status(200).json("Book added successfully to shelf")
            })
    }
})

/////////////////////****edit review, rate****/////////////////////

router.patch('/:id', (req, res) => {
    const { type } = req.body;
    const { currentUser } = req
    const { id } = req.params

    ///// Edit review
    if (type === 'review') {
        const { reviewID, newContent } = req.body;
        if (!reviewID || !newContent.trim()) return res.json({ error: 'review content required' })
        BookModel.findById(id)
            .populate('reviews.user')
            .then(book => {
                book.reviews.id(reviewID).content = newContent
                book.save()
                    .then(book => res.status(200).json(book.reviews.id(reviewID)))
                    .catch(err => res.status(400).send(err))
            })
            .catch(err => res.status(400).send(err))
    }

    ///// Edit shelve
    else if (type === 'shelf') {
        const { shelf } = req.body
        UserModel.findOneAndUpdate({ _id: currentUser._id, "books.book": id },
            { "books.$.shelf": shelf },
            (err) => {
                if (err) res.send(err)
                res.status(200).json("Book updated successfully to shelf")
            })
    }

})

router.delete('/:id', (req, res) => {
    const { type } = req.body;
    const { id } = req.params
    const { currentUser } = req

    if (type === 'review') {
        const { reviewID } = req.body
        BookModel.findById(id)
            .populate('reviews.user')
            .then(book => {
                book.reviews.pull({ _id: reviewID, user: mongoose.Types.ObjectId("5eb4628d746f7c3026426730") })//currentUser._id
                book.save()
                    .then(book => res.json(book.reviews))
                    .catch(err => res.status(400).send(err))

            })
            .catch(err => res.status(400).send(err))
    }

    // delete book from shelve
    else if (type === 'shelf') {
        UserModel.findOneAndDelete({ _id: currentUser._id },
            { $pull: { "books": { "book": id } } },
            (err) => {
                if (err) res.send(err)
                res.status(200).json("Book Deleted successfully from shelf")
            })
    }
})

module.exports = router