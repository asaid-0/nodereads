const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const booksRouter = require('./routes/books');
const adminRoute = require('./routes/admins')
const homeRouter = require('./routes/home');
const { auth, admin } = require('./middleware/auth');
const userRoutes = require('./routes/user');
const authorsRouter = require('./routes/authors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000
const uri = process.env.DB_URI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (!err) console.log("mogodb started");
    else console.log(err);
})


app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(express.json())


// app.use('/admin', admin, adminRoute);
// app.use('/books', auth, booksRouter);
app.use('/admin', adminRoute);
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/home', homeRouter);
app.use('/', userRoutes);


app.listen(port, () => console.log(`Server running on port ${port}`));