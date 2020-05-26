import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
const AuthorCard = ({ author }) => {

    return (

        <Card as={Link} to={`/authors/${author._id}`} style={{ width: '13rem' }}>
            <Card.Img variant="top" src={author.photo ? `/${author.photo}` : "https://cdn.pixabay.com/photo/2015/08/25/10/40/ben-knapen-906550_960_720.jpg"} />
            <Card.Body>
                <Card.Title>{author.firstname} {author.lastname}</Card.Title>
            </Card.Body>
        </Card>





    )
}

export default AuthorCard;