const express = require('express');
const mongoose = require('mongoose');
const BookModel = require('../models/Book')
const ShelveModel = require('../models/Shelve')

const router = express.Router();
const Book = require('../models/Book');
// router.get('/', (req, res) => {
//     res.send('route get /books');
// })


/////////////////////**** retrieve all books ****/////////////////////

router.get('/', (req, res) => {

    BookModel.find({})
        .populate('authors')
        .then(books => res.status(200).json(books))
        .catch(err => res.status(400).send(err))
})

/////////////////////**** retrieve book info ****/////////////////////

router.get('/:id', (req, res) => {
    const { id } = req.params
    // res.send(`route get /books/${id}`);
    BookModel.findById(id)
        .populate('authors')
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
        if (!content) res.status(400).send('review content missing')

        const review = {
            user: currentUser,
            content,
        }

        BookModel.findById(id)
            .populate('authors')
            .then(book => {
                // check if user submitted review before
                const oldReview = book.reviews.filter(review => review.user.toString() === currentUser._id)
                if (!oldReview.length) {
                    book.reviews.push(review)
                    book.save()
                        .then(book => res.status(200).json(book))
                        .catch(err => res.status(400).send(err))
                } else res.status(400).send('review already exist')
            })
            .catch(err => res.send(err))
    }

    /////// submit rate
    else if (type === 'rate') {
        const { rate } = req.body
        const { currentUser } = req
        if (!rate || typeof (rate) != 'number') res.status(400).send('Invalid rate')

        const userRate = {
            user: currentUser,
            rate,
        }

        BookModel.findById(id)
            .populate('authors')
            .then(book => {
                // check if user submitted rate before
                const oldRate = book.rates.filter(rate => rate.user.toString() === currentUser._id)

                if (!oldRate.length) {
                    book.rates.push(userRate)
                    book.save()
                        .then(book => res.status(200).json(book))
                        .catch(err => res.status(400).send(err))
                }
                // Edit rate
                else {

                    // book.rates.forEach(userRate => {
                    //     if (userRate.user.toString() === currentUser._id) {
                    //         userRate.rate = rate;
                    //     }
                    // })

                    book.rates.id(oldRate[0]._id).rate = rate;
                    book.save()
                        .then(book => res.status(200).json(book))
                        .catch(err => res.status(400).send(err))

                }
            })
            .catch(err => res.status(400).send(err))
    }

    //////// add to shelve
    else if (type === 'shelve'){
        const { shelve } = req.body
        const { currentUser } = req

        bookModel.findById(id)
        .then(book => {
            // update shelve if exists or create new one
            Shleve.findOneAndUpdate(
                {user:currentUser._id, book: id},
                {shelve:shelve},
                {
                    new:true,
                    upsert:true
                }, (err, newShelve) => {
                    if(err) res.status(400).json(err)
                    res.status(200).json(newShelve)
                }
            )
        })
        .catch(err => res.status(400).json({"err":"book doesn't exist"}))
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
        if (!reviewID || !newContent) res.status(400).send('bad request')
        BookModel.findById(id)
            .populate('authors')
            .then(book => {
                // book.reviews.forEach(review => {
                //     if (review.user.toString() === currentUser._id) {
                //         review.content = newContent;
                //     }
                // })
                book.reviews.id(reviewID).content = newContent
                console.log(book.reviews.id(reviewID).content);

                book.save()
                    .then(book => res.status(200).json(book))
                    .catch(err => res.status(400).send(err))

            })
            .catch(err => res.status(400).send(err))

    }

    ///// Edit rate
    // if (type === 'rate') {
    //     const {  newRate } = req.body;
    //     if (!rateID || !newRate || typeof (newRate) != 'number') res.status(400).send('bad request')
    //     BookModel.findById(id)
    //         .then(book => {
    //             book.rates.forEach(userRate => {
    //                 if (userRate.user.toString() === currentUser._id) {
    //                     userRate.rate = newRate;
    //                 }
    //             })
    //             res.status(200).json(book)
    //         })
    //         .catch(err => res.status(400).send(err))
    // }

    ///// Edit shelve
    else if (type === 'shelve'){
        const { shelve } = req.body
        const { currentUser } = req

        // update shelve if exists or create new one
        Shleve.findOneAndUpdate(
            {user:currentUser._id, book: id},
            {shelve:shelve},
            {new:true}, (err, newShelve) => {
                if(err) res.status(400).json(err)
                res.status(200).json(newShelve)
            }
        )
        
    }

})

router.delete('/:id', (req, res) => {
    const { type } = req.body;
    const { id } = req.params
    const { currentUser } = req

    if (type === 'review') {
        const { reviewID } = req.body
        BookModel.findById(id)
            .populate('authors')
            .then(book => {
                book.reviews.pull({ _id: reviewID, user: mongoose.Types.ObjectId(currentUser._id) })
                book.save()
                    .then(book => res.json(book))
                    .catch(err => res.status(400).send(err))

            })
            .catch(err => res.status(400).send(err))
    }

    // delete book from shelve
    else if (type === 'shelve'){
        const { currentUser } = req

        // update shelve if exists or create new one
        Shleve.findOneAndDelete(
            {user:currentUser._id, book: id}, (err, deletedShelve) => {
                if(err) res.status(400).json(err)
                res.status(200).json(deletedShelve)
            }
        )
        
    }
})

module.exports = router