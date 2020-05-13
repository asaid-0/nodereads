import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewEditForm(props) {

    const [review, setReview] = useState("");
    const [reviewId, setReviewId] = useState("")
    useEffect(() => {
        if (props.review) {
            setReviewId(props.review._id);
            setReview(props.review.content)
        }

    }, [props.review])


    const handleChange = (e) => {
        setReview(e.target.value)
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
                    // console.log(res.data);
                    if (!res.data.error) {
                        props.updateReview(res.data)
                    } else alert(res.data.error)
                })
                .catch(err => console.log(err))
        } else {
            const payload = {
                "type": "review",
                "content": review,
            }

            axios.post(`/books/${props.bookId}`, payload)
                .then(res => {
                    // console.log(res.data.error);
                    if (!res.data.error) {
                        setReview("");
                        props.updateReviewList(res.data);
                    } else alert(res.data.error)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div >
                <textarea placeholder="Review" rows="4" cols="50" required
                    onChange={handleChange}
                    value={review}
                />
            </div>
            <div className="comment-form-actions">
                <button type="submit">{reviewId ? "Save": "Submit Review"}</button>
            </div>
        </form>
    )
}

export default ReviewEditForm
