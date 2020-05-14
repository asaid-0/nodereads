import React from 'react';
import styles from './BookCard.module.css';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';


const BookCard = (props) => {

    const { item } = props;
    console.log(item);


    return (

        <Card className={styles.card}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body className={styles.text}>
                <Card.Title>{item.book.title}</Card.Title>
                <Card.Text >
                    {item.book.shortDescription}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{item.shelf}</ListGroupItem>
            </ListGroup>
        </Card>


    )
}
export default BookCard;
