import React, { useState } from 'react'
import axios from 'axios';

function ReviewForm(props) {

    const [review, setReview] = useState("");

    const handleChange = (e) => {
        setReview(e.target.value);
    }

    const payload = {
        "type": "review",
        "content": review,
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`/books/${props.bookId}`, payload)
            .then(res => {
                // console.log(res.data.error);
                if (!res.data.error) {
                    setReview("");
                    props.updateReviewList(res.data);
                }else alert(res.data.error)
            })
            .catch(err => console.log(err))

    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div >
                    <textarea placeholder="Review" rows="4" cols="50"
                        onChange={handleChange}
                        value={review}
                    />
                </div>
                <div className="comment-form-actions">
                    <button type="submit">Submit review</button>
                </div>
            </form>
        </div>
    )
}

export default ReviewForm
