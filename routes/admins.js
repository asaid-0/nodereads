const router = require('express').Router()
const BookModel = require('../models/Book')
const AuthorModel = require('../models/Author')
const CategoryModel = require('../models/Category')

//Get all books with populate
router.get('/books', async (req, res) => {
    console.log("current_user: ", req.currentUser);
    try {
        books = await BookModel.find({}).populate("authors").exec()
        res.json(books)
    } catch (error) {
        res.send(error);
    }

})

//get certain book with populate
router.get('/books/:id', async (req, res) => {
    try {
        book = await BookModel.findById(req.params.id).populate("authors").exec()
        res.json(book)
    } catch (error) {
        res.send(error);
    }
    // BookModel.findById(req.params.id , (err, book) => {
    //     if (err) res.send(err);
    //     res.json(book)
    // })
})

//add new book and add the book to authors books
router.post('/books',(req,res)=>{
    const {body: {name, authors, categories}} = req
    const book= new BookModel({
        name,
        authors,
        categories
    })
    book.save((err,book)=>{
        if (err) res.send(err);
        authors.map(author=>{
            AuthorModel.findById(author,(err,author)=>{
                author.books.push(book._id)
                author.save((err,author)=>{
                    if (err) res.send(err)
                })
            })
        })
        res.json(book)
    })
})

//edit book
router.patch('/books/:id',(req,res)=>{
    BookModel.findByIdAndUpdate(req.params.id,req.body,{new: true},(err,book)=>{
        if (err) res.send(err);
        res.json(book)
    })
})

//delete book
router.delete('/books/:id',(req,res)=>{
    BookModel.findByIdAndDelete(req.params.id,(err,book)=>{
        if (err) res.send(err)
        res.json(book)
    })
})

//Get all authors with populate
router.get('/authors', async (req,res)=>{
    try {
    authors = await AuthorModel.find({}).populate("books").exec()
    res.json(authors)
    } catch (error) {
        res.send(error);
    }
})

//get certain author with populate
router.get('/authors/:id',async (req,res)=>{
    try {
        author = await  AuthorModel.findById(req.params.id).populate("books").exec()
        res.json(author)
    } catch (error) {
        res.send(error)
    }
})

//add new author 
router.post('/authors',(req,res)=>{
    const {body: {firstname,lastname,dob}} = req
    const author = new AuthorModel ({
        firstname,
        lastname,
        dob
    })
    author.save((err,author)=>{
        if (err) res.send(err);
        res.json(author)
    })
}),

//edit author
router.patch('/authors/:id',(req,res)=>{
    AuthorModel.findByIdAndUpdate(req.params.id,req.body,{new: true},(err,author)=>{
        if (err) res.send(err);
        res.json(author)
    })
})

//delete author
router.delete('/authors/:id',(req,res)=>{
    AuthorModel.findByIdAndDelete(req.params.id,(err,author)=>{
        if (err) res.send(err)
        res.json(author)
    })
})

router.get('/categories', (req, res) => {
    try {
        categories = await CategoryModel.find({}).populate("books").exec()
        res.json(categories)
    } catch (error) {
        res.send(error);
    }
})

router.patch('/categories/:id', (req, res) => {
    CategoryModel.findByIdAndUpdate(req.params.id,req.body,{new: true},(err,category)=>{
        if (err) res.send(err);
        res.json(category)
    })
})

router.delete('/categories/:id', (req, res) => {
    CategoryModel.findByIdAndDelete(req.params.id,(err,category)=>{
        if (err) res.send(err)
        res.json(category)
    })
})


module.exports = router;
