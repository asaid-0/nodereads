import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
const CategoryCard = ({category}) => {

    return(
        <Card as={Link} to={`/categories/${category._id}`} style={{minHeight:'10em'}}>
            <Card.Body>
                <Card.Title style={{margin:0}}>{category.name}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default CategoryCard;