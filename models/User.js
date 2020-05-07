const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    isAdmin: {type: Boolean, required: true},
    firstname: { type: String, required: true, minlength: 3, maxlength: 15 },
    lastname: { type: String, required: true, minlength: 3, maxlength: 14 },
    email: { type: String, required: true, unique: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    password: { type: String, required: true },
    photo: { data: Buffer, contentType: String },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Book', shelf: {
                type: String,
                enum: ["read", "reading", "want to read"],
                default: "want to read"
            }
        }
    ]
})

const User = mongoose.model('User', schema);
module.exports = User;