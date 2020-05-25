import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
const AuthorCard = ({author}) => {

    return(
        <Card as={Link} to={`/authors/${author._id}`} style={{minHeight:'10em'}}>
            <Card.Body>
                <Card.Title style={{margin:0}}>{author.firstname} {author.lastname}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default AuthorCard;