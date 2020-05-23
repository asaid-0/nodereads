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
    const { currentUser } = req
    // console.log(currentUser);
    // res.send(`route get /books/${id}`);
    BookModel.findById(id)
        .populate('author')
        .populate('reviews.user')
        .populate('categories')
        .then(book => {

            res.status(200).json(book)
        })
        .catch(err => res.status(400).send(err))

})


/////////////////////**** submit review, rate, add to shelve ****/////////////////////

router.post('/:id', (req, res) => {

    const { type } = req.body;
    const { id } = req.params
    const { currentUser } = req
    // console.log(currentUser);
    
    /////// submit review
    if (type === 'review') {

        const { content } = req.body
        if (!content.trim()) return res.status(400).json({ error: 'Review content required' })
        if (content.trim().length < 3 ) return res.status(400).json({ error: 'Review content is shorter than the minimum allowed length (3)' })
        
        const review = {
            // user: currentUser,
            user: mongoose.Types.ObjectId("5eb4628d746f7c3026426730"),
            content: content.trim(),
        }

        BookModel.findById(id)
            .then(book => {
                // check if user submitted review before
                const oldReview = book.reviews.find(review => review.user._id.toString() === "5eb4628d746f7c3026426730")//currentUser._id
                // console.log(oldReview);

                if (!oldReview) {

                    book.reviews.push(review)
                    book.save()
                        .then(book => {
                            // console.log(book.populated);
                            book.populate('reviews.user', function(err,book) {
                                res.status(200).json(book.reviews)
                               });
                        })
                        .catch(err => {
                            console.log(err);

                            res.status(400).send(err)
                        })

                } else return res.status(400).json({ error: 'You have already submitted a review, you can edit it in review section below' })
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
            user: mongoose.Types.ObjectId("5eb4628d746f7c3026426730"),
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
        if (!reviewID || !newContent.trim()) return res.status(400).json({ error: 'Review content required' })
        if (newContent.trim().length < 3 ) return res.status(400).json({ error: 'Review content is shorter than the minimum allowed length (3)' })

        BookModel.findById(id)
            .populate('reviews.user')
            .then(book => {
                book.reviews.id(reviewID).content = newContent.trim()
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

    if (type === 'rate') {
        const { rateID } = req.body
        
        BookModel.findById(id)
            .then(book => {
                book.rates.pull({ _id: rateID, user: mongoose.Types.ObjectId("5eb4628d746f7c3026426730") })//currentUser._id
                book.save()
                    .then(book => res.json(book.rates))
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