const router = require("express").Router();
const BookModel = require("../models/Book");
const AuthorModel = require("../models/Author");
const CategoryModel = require("../models/Category");
const upload = require('../middleware/multer')

//Get all books with populate
router.get("/books", async (req, res) => {
    console.log("current_user: ", req.currentUser);
    try {
        books = await BookModel.find({}).populate("author").populate("categories").exec();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json(error);
    }
});

//get certain book with populate
router.get("/books/:id", async (req, res) => {
    try {
        book = await BookModel.findById(req.params.id).populate("author").populate("categories").exec();
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json(error);
    }
});

//add new book and add the book to authors books
router.post("/books", upload.single('bookImage') ,async (req, res) => {
    
    const { name, author, categories } = req.body;
    const photo = req.file
    if (!name || !author || !categories || !photo) return res.status(400).send("bad request");
    const book = new BookModel({
        name,
        author,
        categories,
        photo: req.file.path
    });
    try {
        await book.save()
        // await CategoryModel.updateMany({ _id: { $in: categories } }, { $push: { books: book._id } })
        res.status(200).send(book);
    } catch (error) {
        return res.status(500).send(error);
    }
});

//edit book
router.patch("/books/:id", upload.single('bookImage'), (req, res) => {
    const { name, author, categories } = req.body;
    const photo = req.file
    if (!name || !author || !categories) return res.status(400).send("bad request");
    const modifiedBook = {
        name,
        author,
        categories
    }
    if (photo){
        modifiedBook.photo = photo.path
    }
    BookModel.findByIdAndUpdate(req.params.id, modifiedBook, { new: true })
        .then(book => {
            res.status(200).json(book)
        }).catch(err => {
            res.status(500).send(err)
        })
    // BookModel.findById(req.params.id)
    //     .then((book) => {
    //         book.name = name;
    //         book.authors = authors;
    //         book.categories = categories;
    //         book.save()
    //             .then((book) => res.status(200).json(book))
    //             .catch((err) => res.status(400).send(err));
    //     })
    //     .catch((err) => res.status(400).send(err));
});

//delete book
router.delete("/books/:id", (req, res) => {
    BookModel.findByIdAndDelete(req.params.id, (err, book) => {
        if (err) res.status(500).send(err);
        res.status(200).json(book);
    });
});

//Get all authors with populate
router.get("/authors", async (req, res) => {
    try {
        authors = await AuthorModel.find({});
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get certain author with populate
router.get("/authors/:id", async (req, res) => {
    try {
        author = await AuthorModel.findById(req.params.id);
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json(error);
    }
});

//add new author
router.post("/authors", upload.single('authorImage') ,(req, res) => {
    const { firstname, lastname, dob } = req.body;
    const photo = req.file
    if (!firstname || !lastname || !dob || !photo ) return res.status(400).send("bad request");

    const author = new AuthorModel({
        firstname,
        lastname,
        dob,
        photo: req.file.path
    });
    author.save((err, author) => {
        if (err) res.status(200).json(err);
        res.status(200).json(author);
    });
}),
    //edit author
    router.patch("/authors/:id", upload.single('authorImage'), (req, res) => {
        const { firstname, lastname, dob } = req.body;
        const photo = req.file
        if (!firstname || !lastname || !dob) return res.status(400).send("bad request");

        const modifiedAuthor = {
            firstname,
            lastname,
            dob
        }
        if (photo){
            modifiedAuthor.photo = photo.path
        }
        AuthorModel.findByIdAndUpdate(req.params.id, modifiedAuthor, { new: true })
            .then(author => {
                res.status(200).json(author)
            }).catch(err => {
                res.status(500).send(err)
            })
    });

//delete author
router.delete("/authors/:id", (req, res) => {
    AuthorModel.findByIdAndDelete(req.params.id, (err, author) => {
        if (err) res.status(200).json(err);
        res.status(200).json(author);
    });
});

router.get("/categories", async (req, res) => {
    try {
        categories = await CategoryModel.find({}).populate("books").exec();
        res.send(categories);
    } catch (error) {
        res.status(200).json(error);
    }
});

router.get("/categories/:id", async (req, res) => {
    try {
        const { params: { id } } = req
        //books = await BookModel.find({categories: id}).populate("author").populate("categories").exec();
        CategoryModel.findById(id, (err, category)=>{
            if(err) res.send(err)
            if(category){
                BookModel.find({categories: category._id},(err, books)=>{
                    if(err) res.send(err)
                    if(books.length > 0)
                        res.send(books)
                    else
                        res.send({"err":"No books in this category"})
                })
            } else {
                res.send({"err":"Category doesn't exist"})
            }
        })
    } catch (error) {
        res.send(error);
    }
});

router.post('/categories', (req, res) => {
    const { body: { name } } = req
    if( name && name.length > 0){
        const category = new CategoryModel({
            name
        })
        category.save((err, category) => {
            if (err) res.send(err);
            res.send(category)
        })
    } else {
        res.send({"err":"Name is empty or undefined"})
    }
})

router.patch('/categories/:id', (req, res) => {
    const { body: { name } } = req
    if( name && name.length > 0){
        CategoryModel.findByIdAndUpdate(req.params.id, { 'name': name }, (err, category) => {
            if (err) res.send(err);
            res.send(category)
        })
    } else {
        res.send({"err":"Name is empty or undefined"})
    }
})

router.delete('/categories/:id', (req, res) => {
    CategoryModel.findByIdAndDelete(req.params.id, function(err, category){
        if (err) res.send(err)
        try{
            BookModel.updateMany(
                { cateogries : category._id },
                { $pull:{ categories : { $in: [category._id]} } },
                { multi: true }, (err) => {
                    if (err) res.send(err)
                    res.send(category)
                }
            )
        } catch {
            res.send({"err":"Category doesn't exist"})
        }
        
    })
})


module.exports = router;
