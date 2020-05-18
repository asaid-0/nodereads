import React from 'react';
import styles from './BookCard.module.css';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';


const BookCard = (props) => {

    const { book, shelf } = props;

    console.log(book);


    return (

        <div className={styles.card_container} >
            <span className={styles.pro}>PRO</span>
            <img className={styles.round} src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
            <h3 className={styles.title} >Ricky Park</h3>
            <span>by</span>
            <h6 className={styles.author}>New York</h6>
            <div>
                <button className={styles.primary}>
                    Message
		        </button>
            </div>
        </div>

    )
}
export default BookCard;
