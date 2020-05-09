const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    status: { 
        type: String, 
        enum : ['want to read', 'reading', 'read'], 
        default: 'want to read' 
    }, 
    book:{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Shelve = mongoose.model('Shelve', schema);
module.exports = Shelve;