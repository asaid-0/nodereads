import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
const AuthorBook = ({book}) => {

    return(
        <Card as={Link} to={`/books/${book._id}`} style={{minHeight:'10em'}}>
            <Card.Body>
                <Card.Title style={{margin:0}}>{book.name}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default AuthorBook;