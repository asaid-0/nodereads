const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000
const uri = process.env.DB_URI


app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.json({"message": "working"});
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (!err) console.log("mogodb started");
    else console.log(err);
})

app.listen(port, () => console.log(`Server running on port ${port}`));