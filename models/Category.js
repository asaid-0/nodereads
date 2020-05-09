const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 15 },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Book'
        }
    ]
})

schema.pre('remove', function (next) {
    var category = this;
    category.model('Book').update(
        { categories: {$in: category.books}}, 
        { $pull: { category: category._id } }, 
        { multi: true }, 
        next
     );
});

const Category = mongoose.model('Category', schema);
module.exports = Category;