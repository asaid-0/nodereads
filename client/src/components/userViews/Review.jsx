import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ReviewEditForm from './ReviewEditForm'


function Review(props) {

    const [review, setReview] = useState({ ...props.review, isInEditMode: false })

    const changeMode = () => {
        setReview({ ...review, isInEditMode: !review.isInEditMode });
    }

    const updateReview = (newReview) => {
        setReview({ ...newReview, isInEditMode: !review.isInEditMode });
    }

    return (
        <div>
            {review.isInEditMode ?
                <>
                    <ReviewEditForm updateReview={updateReview} bookId={props.bookId} review={review} />
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
                        </Card.Text>
                    </Card.Body>
                </Card>
            }

        </div>
    )
}

export default Review
