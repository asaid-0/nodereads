const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    res.send('route get /books/:id');
})

router.post('/:id', (req, res) => {
    const { type } = req.body;

    if (type === 'review') {
        res.send('post review');
    }

    else if (type === 'rate') {
        res.send('post rate');
    }

})

router.patch('/:id', (req, res) => {
    const { type } = req.body;

    if (type === 'review') {
        res.send('patch review');
    }

})

router.delete('/:id', (req, res) => {
    const { type } = req.body;

    if (type === 'review') {
        res.send('delete review');
    }

})