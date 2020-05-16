import React from 'react';
import styles from './BookCard.module.css';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';


const BookCard = (props) => {

    const { book, shelf } = props;

    console.log(book);


    return (

        <Card className={styles.card}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body className={styles.text}>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text >
                    {book.shortDescription}
                </Card.Text>
            </Card.Body>
            {
                shelf ?
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{shelf}</ListGroupItem>
                    </ListGroup> : null
            }
        </Card>


    )
}
export default BookCard;
