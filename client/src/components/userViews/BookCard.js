import React from 'react';
import styles from './BookCard.module.css';
import { Link } from 'react-router-dom';
import { Rate } from 'antd';


const BookCard = (props) => {

    const { book, shelf } = props;

    console.log(book);


    return (

        <div className={styles.card_container} >
            <span className={styles.pro}>
                <Rate disabled defaultValue={2} />
            </span>
            <img className={styles.round} src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
            <h3> <Link className={styles.title} > Ricky Park </Link> </h3>
            <span>by</span>
            <h6> <Link className={styles.author}>New York</Link> </h6>
            <div>
                <button className={styles.primary}>
                    Message
		        </button>
            </div>
        </div>

    )
}
export default BookCard;
