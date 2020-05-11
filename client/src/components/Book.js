import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Review from './Review';
function Book(props) {

    const [book, setBook] = useState({});

    const { match: { params: { bookId } } } = props;

    useEffect(() => {
        axios.get(`/books/${bookId}`)
            .then(res => {
                // console.log(res.data);
                setBook(res.data);
            })
            .catch(err => console.log(err))
    }, [bookId])

    return (
        <>
            <div>
                <h1>{book.name}</h1>
                <img src={book.photo ? `/${book.photo}` : ''} alt="Cover" />
            </div>
            <div>
                <Review bookId={bookId}/>
            </div>
        </>
    )
}

export default Book;
