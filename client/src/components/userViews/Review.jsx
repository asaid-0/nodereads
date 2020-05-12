import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ReviewForm from './ReviewForm'
import axios from 'axios'


function Review(props) {

    const [review, setReview] = useState({ ...props.review, isInEditMode: false })

    const changeMode = () => {
        setReview({ ...review, isInEditMode: !review.isInEditMode });
    }

    const updateReview = (newReview) => {
        setReview({ ...newReview, isInEditMode: !review.isInEditMode });
    }

    const deletReview = (reviewID) => {
        const payload = {
            "type": "review",
            "reviewID": reviewID
        }
        axios.delete(`http://localhost:5000/books/${props.bookId}`, { data: payload })
            .then(res => {
                props.updateReviewList(res.data);
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {review.isInEditMode ?
                <>
                    <ReviewForm updateReview={updateReview} bookId={props.bookId} review={review} />
                    <Button onClick={changeMode} variant="danger">X</Button>
                </>
                :
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>
                            Review
                    </Card.Title>
                        <Card.Text>
                            {review.content}
                            <Button onClick={changeMode} variant="info">Edit</Button>
                            <Button onClick={() => deletReview(review._id)} variant="danger">Delete</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            }

        </div>
    )
}

export default Review
