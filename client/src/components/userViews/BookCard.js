import React, { useEffect } from 'react';
import styles from './BookCard.module.css';
import Shelf from './Shelf';
import { Link } from 'react-router-dom';
import { Rate, Menu, Dropdown, Button, Row } from 'antd';
import $ from 'jquery';
import { DownOutlined } from '@ant-design/icons';
import AverageRate from './AverageRate';


const BookCard = (props) => {
    const { book, shelf, handleShelfChange } = props;
    return (


        <div style={{ margin: "1rem" }} className={styles.card}>
            <div style={{ backgroundImage: book.photo ? `url("/${book.photo}")` : 'url("/images/open_book.png")' }} className={styles.banner}>
                <svg style={{ zIndex: 100 }} viewBox="0 0 100 100">
                    <image href="https://cdn.pixabay.com/photo/2015/08/25/10/40/ben-knapen-906550_960_720.jpg" width="100" height="100" />
                </svg>
            </div>
            <div
                className={styles.menu}>
            </div>
            <div style={{ margin: "0.4rem auto" }}>
                {
                    book.rates.length ? <AverageRate rates={book.rates} /> : "Not rated"
                }
            </div>
            <h2 className={styles.name}><Link className={styles.name} to={`/books/${book._id}`} > {book.name} </Link></h2>
            <div className={styles.title}>
                <Link to={`/authors/${book.author._id}`} className={styles.author}>{book.author.firstname} {book.author.lastname}</Link>
            </div>
            <div className={styles.actions}>
                <Shelf book={book._id} />
            </div>

        </div>



    )
}
export default BookCard;
