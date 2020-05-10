const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstname: { type: String, required: true, minlength: 3, maxlength: 15 },
    lastname: { type: String, required: true, minlength: 3, maxlength: 14 },
    photo: { data: Buffer, contentType: String },
    dob: { type: Date, required: true },
})

schema.pre('findOneAndDelete', function (next) {
    const author_id = this.getQuery()._id
    const BookModel = mongoose.model('Book')
    BookModel.deleteMany({"author": author_id},(err, books)=>{
        if (err) next(err)
        next()
    })
})

const Author = mongoose.model('Author', schema);
module.exports = Author;

