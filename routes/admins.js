const router = require("express").Router();
const BookModel = require("../models/Book");
const AuthorModel = require("../models/Author");
const CategoryModel = require("../models/Category");

//Get all books with populate
router.get("/books", async (req, res) => {
  console.log("current_user: ", req.currentUser);
  try {
    books = await BookModel.find({}).populate("authors").exec();
    res.json(books);
  } catch (error) {
    res.send(error);
  }
});

//get certain book with populate
router.get("/books/:id", async (req, res) => {
  try {
    book = await BookModel.findById(req.params.id).populate("authors").exec();
    res.json(book);
  } catch (error) {
    res.send(error);
  }
  // BookModel.findById(req.params.id , (err, book) => {
  //     if (err) res.send(err);
  //     res.json(book)
  // })
});

//add new book and add the book to authors books
router.post("/books", (req, res) => {
  const {
    body: { name, authors, categories },
  } = req;
  if (!name || !authors || !categories) res.status(400).send("bad request");
  const book = new BookModel({
    name,
    authors,
    categories,
  });
  book.save((err, book) => {
    if (err) res.status(400).send(err);
    authors.map((author) => {
      AuthorModel.findById(author, (err, author) => {
        author.books.push(book._id);
        author.save((err, author) => {
          if (err) res.status(400).send(err);
        });
      });
    });
    categories.map((cat) => {
      CategoryModel.findById(cat, (err, cat) => {
        cat.books.push(book._id);
        cat.save((err, cat) => {
          if (err) res.status(400).send(err);
        });
      });
    });
    res.status(200).send(book);
  });
});

//edit book
router.patch("/books/:id", (req, res) => {
  const { name, authors, categories } = req.body;
  if (!name || !authors || !categories) res.status(400).send("bad request");
  BookModel.findById(req.params.id)
    .then((book) => {
      book.name = name;
      book.authors = authors;
      book.categories = categories;
      book
        .save()
        .then((book) => res.status(200).json(book))
        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send(err));
  // BookModel.findByIdAndUpdate(req.params.id,req.body,{new: true},(err,book)=>{
  //     if (err) res.send(err);
  //     res.json(book)
  // })
});

//delete book
router.delete("/books/:id", (req, res) => {
  BookModel.findByIdAndDelete(req.params.id, (err, book) => {
    if (err) res.send(err);
    res.json(book);
  });
});

//Get all authors with populate
router.get("/authors", async (req, res) => {
  try {
    authors = await AuthorModel.find({}).populate("books").exec();
    res.json(authors);
  } catch (error) {
    res.send(error);
  }
});

//get certain author with populate
router.get("/authors/:id", async (req, res) => {
  try {
    author = await AuthorModel.findById(req.params.id).populate("books").exec();
    res.json(author);
  } catch (error) {
    res.send(error);
  }
});

//add new author
router.post("/authors", (req, res) => {
  const { firstname, lastname, dob } = req;
  if (!firstname || !lastname || !dob) res.status(400).send("bad request");

  const author = new AuthorModel({
    firstname,
    lastname,
    dob,
  });
  author.save((err, author) => {
    if (err) res.send(err);
    res.json(author);
  });
}),
  //edit author
  router.patch("/authors/:id", (req, res) => {
    const { firstname, lastname, dob } = req;
    if (!firstname || !lastname || !dob) res.status(400).send("bad request");

    AuthorModel.findById(req.params.id)
      .then(author => {
        author.firstname = firstname;
        author.lastname = lastname;
        author.dob = dob;
        author.save()
          .then((author) => res.status(200).json(author))
          .catch((err) => res.status(400).send(err));
      }).catch((err) => res.status(400).send(err));

    // AuthorModel.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   {
    //     new: true,
    //   },
    //   (err, author) => {
    //     if (err) res.send(err);
    //     res.json(author);
    //   }
    // );
  });

//delete author
router.delete("/authors/:id", (req, res) => {
  AuthorModel.findByIdAndDelete(req.params.id, (err, author) => {
    if (err) res.send(err);
    res.json(author);
  });
});

router.get("/categories", async (req, res) => {
  try {
    categories = await CategoryModel.find({}).populate("books").exec();
    res.json(categories);
  } catch (error) {
    res.send(error);
  }
});

router.post("/categories", (req, res) => {
  const {
    body: { name },
  } = req;
  const category = new CategoryModel({
    name,
  });
  category.save((err, categroy) => {
    if (err) res.send(err);
    res.json(categroy);
  });
});

router.patch("/categories/:id", (req, res) => {
  CategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
    (err, category) => {
      if (err) res.send(err);
      res.json(category);
    }
  );
});



router.post('/categories', (req, res) => {
    const {body: { name }} = req
    const category = new CategoryModel ({
        name
    })
    category.save((err,categroy)=>{
        if (err) res.send(err);
        res.json(categroy)
    })
})

router.patch('/categories/:id', (req, res) => {
    const {body: { name }} = req
    CategoryModel.findByIdAndUpdate(req.params.id,{'name':name},{new: true},(err,category)=>{
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
