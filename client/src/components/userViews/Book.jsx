import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import Review from './Review';
import WithUserHeaders from '../../HOC/WithUserHeaders';

function Book(props) {

    const [book, setBook] = useState({});
    const [reviewList, setReviewList] = useState([])

    const { match: { params: { bookId } } } = props;

    const updateReviewList = (review) => {
        setReviewList(reviewList.concat(review));
    }

    useEffect(() => {
        axios.get(`/books/${bookId}`)
            .then(res => {
                setBook(res.data);
                // console.log(res.data.reviews);
                setReviewList(res.data.reviews);
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
                <ReviewForm bookId={bookId} updateReviewList={updateReviewList}/>
            </div>
            <div>
                {
                    reviewList.map(review => {
                        return <Review bookId={bookId} review={review} key={review._id}/>
                    })
                }
            </div>
        </>
    )
}

export default WithUserHeaders(Book);
