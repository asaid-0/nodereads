const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    books: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Book'
        }
    ]
})

const Category = mongoose.model('Category', schema);
module.exports = Category;