const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstname: { type: String, required: true, minlength: 3, maxlength: 15 },
    lastname: { type: String, required: true, minlength: 3, maxlength: 14 },
    photo: { data: Buffer, contentType: String },
    dob: { type: Date, required: true },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Book'
        }
    ]
})

const User = mongoose.model('User', schema);
module.exports = User;