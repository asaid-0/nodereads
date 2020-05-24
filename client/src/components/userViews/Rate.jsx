import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { UserContext } from '../authComponents/authContext';
import { Rate as RateAntd } from 'antd';
import 'antd/dist/antd.css';

function Rate(props) {

    const { user } = useContext(UserContext);
    const [rating, setRating] = useState({})

    useEffect(() => {
        if (props.book.rates) {
            const rate = props.book.rates.find(rate => rate.user === user._id)//currentUser._id
            rate ? setRating(rate) : setRating({});
        }

    }, [props.book])

    const handleChangeRate = (newRate) => {
        if (newRate) {
            setRating({ ...rating, rate: newRate });

            const payload = {
                "type": "rate",
                "rate": newRate
            }

            axios.post(`/books/${props.book._id}`, payload)
                .then(res => {
                    setRating(res.data);
                })
                .catch(err => console.log(err))
        } else {

            setRating({ ...rating, rate: 0 })

            const payload = {
                "type": "rate",
                "rateID": rating._id
            }

            axios.delete(`/books/${props.book._id}`, { data: payload })
                .then(res => {
                    setRating({ ...rating, rate: 0 });
                })
                .catch(err => console.log(err))
        }

    }



    return (
        <div>
            <RateAntd onChange={handleChangeRate} allowClear allowHalf value={rating.rate} />
        </div>
    )
}

export default Rate
