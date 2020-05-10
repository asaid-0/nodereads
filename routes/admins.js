const router = require("express").Router();
const BookModel = require("../models/Book");
const AuthorModel = require("../models/Author");
const CategoryModel = require("../models/Category");

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
router.post("/books", async (req, res) => {
    const { name, author, categories } = req.body;
    if (!name || !author || !categories) return res.status(400).send("bad request");
    const book = new BookModel({
        name,
        author,
        categories,
    });
    try {
        await book.save()
        // await CategoryModel.updateMany({ _id: { $in: categories } }, { $push: { books: book._id } })
        res.status(200).send(book);
    } catch (error) {
        return res.status(400).send(error);
    }
});

//edit book
router.patch("/books/:id", (req, res) => {
    const { name, author, categories } = req.body;
    if (!name || !author || !categories) return res.status(400).send("bad request");
    const modifiedBook = {
        name,
        author,
        categories
    }
    BookModel.findByIdAndUpdate(req.params.id, modifiedBook, { new: true })
        .then(book => {
            res.status(200).json(book)
        }).catch(err => {
            res.status(400).send(err)
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
        if (err) res.send(err);
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
        res.status(200).json(error);
    }
});

//add new author
router.post("/authors", (req, res) => {
    const { firstname, lastname, dob } = req.body;
    if (!firstname || !lastname || !dob) return res.status(400).send("bad request");

    const author = new AuthorModel({
        firstname,
        lastname,
        dob,
    });
    author.save((err, author) => {
        if (err) res.status(200).json(err);
        res.status(200).json(author);
    });
}),
    //edit author
    router.patch("/authors/:id", (req, res) => {
        const { firstname, lastname, dob } = req.body;
        if (!firstname || !lastname || !dob) return res.status(400).send("bad request");

        AuthorModel.findById(req.params.id)
            .then(author => {
                author.firstname = firstname;
                author.lastname = lastname;
                author.dob = dob;
                author.save()
                    .then((author) => res.status(200).json(author))
                    .catch((err) => res.status(200).json(err));
            }).catch((err) => res.status(400).send(err));
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
        res.json(categories);
    } catch (error) {
        res.status(200).json(error);
    }
});

router.get("/categories/:id", async (req, res) => {
    try {
        const { params: { id } } = req
        books = await CategoryModel.findById(id).populate("books").exec();
        res.json(books);
    } catch (error) {
        res.send(error);
    }
});

router.post('/categories', (req, res) => {
    const { body: { name } } = req
    const category = new CategoryModel({
        name
    })
    category.save((err, categroy) => {
        if (err) res.send(err);
        res.json(categroy)
    })
})

router.patch('/categories/:id', (req, res) => {
    const { body: { name } } = req
    CategoryModel.findByIdAndUpdate(req.params.id, { 'name': name }, { new: true }, (err, category) => {
        if (err) res.send(err);
        res.json(category)
    })
})

router.delete('/categories/:id', (req, res) => {
    CategoryModel.findByIdAndDelete(req.params.id, (err, category) => {
        if (err) res.send(err)
        res.json(category)
    })
})


module.exports = router;
