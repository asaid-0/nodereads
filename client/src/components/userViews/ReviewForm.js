import React, { useState } from 'react'
import axios from 'axios';

function ReviewForm(props) {

    const [review, setReview] = useState("");

    const handleChange = (e) => {
        setReview(e.target.value);
    }

    const request = {
        "type": "review",
        "content": review,
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/books/${props.bookId}`, request)
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
                    <textarea placeholder="Review" rows="4" cols="50" required
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
