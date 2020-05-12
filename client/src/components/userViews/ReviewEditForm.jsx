import React, { useState } from 'react';
import axios from 'axios';

function ReviewEditForm(props) {

    const reviewId = props.review._id;

    const [review, setReview] = useState(props.review.content);

    const handleChange = (e) => {
        setReview(e.target.value)
    }

    const payload = {
        "type": "review",
        "newContent": review,
        "reviewID": reviewId
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`/books/${props.bookId}`, payload)
            .then(res => {
                // console.log(res.data);
                if (!res.data.error) {
                    props.updateReview(res.data)
                }else alert(res.data.error)
            })
            .catch(err => console.log(err))
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
                <button type="submit">Save</button>
            </div>
        </form>
    )
}

export default ReviewEditForm
