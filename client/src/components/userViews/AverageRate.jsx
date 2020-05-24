import React, { useState, useEffect } from 'react'
import { Rate as RateAntd } from 'antd';
import 'antd/dist/antd.css';

function AverageRate(props) {

    const [rating, setRating] = useState(0)

    useEffect(() => {
        if (props.rates) {
            const totalRates = props.rates.reduce((acc, curr) => acc + curr.rate, 0);
            const avg = totalRates / props.rates.length;
            setRating(avg)
        }

    }, [props.book])

    return (
        <>
            <RateAntd disabled allowHalf value={rating} style={{ color: '#e89a3c' }} />
            <span> {rating ? rating.toFixed(2) : 0} ({props.rates.length} Ratings)</span>
        </>
    )
}

export default AverageRate
