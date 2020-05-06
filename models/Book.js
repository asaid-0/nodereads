const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 255 },
    photo: { data: Buffer, contentType: String },
    authors: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Author'
        }
    ],
    categories: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
    ],
    rates: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'User', rate: {
                type: Number,
                min: 1,
                max: 5,
            }
        }
    ],
    review: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'User', content: {
                type: String,
                minlength: 3,
                maxlength: 512,
            }
        }
    ],
})

const Book = mongoose.model('Book', schema);
module.exports = Book;