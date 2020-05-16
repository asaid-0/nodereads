import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import ReviewForm from './ReviewForm'
import axios from 'axios'
import { Comment, Avatar, Button, Col } from "antd";

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
                    <Col>
                        <Button onClick={changeMode} type="primary" danger >X</Button>
                    </Col>
                </>
                :
                <Comment
                    author={<a>{`${review.user.firstname} ${review.user.lastname}`}</a>}
                    avatar={
                        <Avatar
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2LfV4GzzKg_8tkHFIGSMw4YzYzAlLDnLYlJ2d6A7mMxygJo_j&usqp=CAU"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <p>
                            {review.content}
                            <br />
                            <Button type="primary" onClick={changeMode} variant="info">Edit</Button>
                            <Button type="primary" danger onClick={() => deletReview(review._id)}>Delete</Button>
                        </p>

                    }

                />
            }

        </div>
    )
}

export default Review
