import React, { useState, useEffect } from 'react'
import Rating from 'react-star-ratings';
import axios from 'axios';

function Rate(props) {

    const [rating, setRating] = useState()

    useEffect(() => {
        if (props.book.rates) {
            const rate = props.book.rates.find(rate => rate.user.toString() === "5eb4628d746f7c3026426730")//currentUser._id
            rate ? setRating(rate.rate) : setRating(0);
        }
        
    }, [props.book])

    const handleChangeRate = (newRate) => {
        const payload = {
            "type": "rate",
            "rate": newRate
        }

        axios.post(`/books/${props.book._id}`, payload)
            .then(res => {
                setRating(res.data.rate);
            })
            .catch(err => console.log(err))

    }



    return (
        <div>
            <Rating
                rating={rating}
                starDimension="25px"
                starSpacing="7px"
                starRatedColor="gold"
                numberOfStars={5}
                name='rating'
                changeRating={handleChangeRate}
            />
        </div>
    )
}

export default Rate
