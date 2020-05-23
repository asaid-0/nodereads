import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ReviewForm.module.css'
import { Button, Input, Alert } from "antd";
import {
    CloseSquareFilled,
    SaveFilled,
} from '@ant-design/icons';

const { TextArea } = Input

function ReviewEditForm(props) {

    const [review, setReview] = useState("");
    const [reviewId, setReviewId] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (props.review) {
            setReviewId(props.review._id);
            setReview(props.review.content)
        }

    }, [props.review])


    const handleChange = (e) => {
        setReview(e.target.value)
    }

    const handleCloseAlert = () => {
        setError("")
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (reviewId) {
            const payload = {
                "type": "review",
                "newContent": review,
                "reviewID": reviewId
            }
            axios.patch(`/books/${props.bookId}`, payload)
                .then(res => {
                    props.updateReview(res.data)
                })
                .catch(err => setError(err.response.data.error))
        } else {
            const payload = {
                "type": "review",
                "content": review,
            }

            axios.post(`/books/${props.bookId}`, payload)
                .then(res => {
                    setReview("");
                    props.updateReviewList(res.data);
                })
                .catch(err => setError(err.response.data.error))
        }
    }

    return (
        <>
            {
                error ? <Alert
                    description={error}
                    type="warning"
                    showIcon
                    closable
                    onClose={handleCloseAlert}
                /> : ""

            }
            <form onSubmit={handleSubmit} className={styles.form}>
                <TextArea allowClear placeholder="Write your Review..." rows="5" required
                    onChange={handleChange}
                    value={review}
                />

                <Button className={styles.button} type="primary" htmlType="submit">
                    {reviewId ? <SaveFilled className={styles.icon} /> : "Submit Review"}
                </Button>
                {reviewId ?
                    <Button onClick={props.changeMode} type="primary" danger ><CloseSquareFilled className={styles.icon} /></Button>
                    : null}
            </form>
        </>
    )
}

export default ReviewEditForm
