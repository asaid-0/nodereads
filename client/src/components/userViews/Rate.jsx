import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {  Rate as RateAntd } from 'antd';
import 'antd/dist/antd.css';

function Rate(props) {

    const [rating, setRating] = useState()

    useEffect(() => {
        if (props.book.rates) {
            const rate = props.book.rates.find(rate => rate.user.toString() === "5eb4628d746f7c3026426730")//currentUser._id
            rate ? setRating(rate.rate) : setRating(0);
        }

    }, [props.book])

    const handleChangeRate = (newRate) => {
        setRating(newRate);

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
            
            <RateAntd onChange={handleChangeRate} allowHalf value={rating} />
            
        </div>
    )
}

export default Rate
