import React from 'react'
import { Button , Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function BookRow({ book, index, deleteBook }) {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{book.name}</td>
            <td>{book.author.firstname}</td>
            <td>{book.categories.map((cat,index)=><h3  key={index}><Badge pill variant="warning"> {cat.name} </Badge></h3>)}</td>

            <td><img style={{ width: 200, height: 200 }} src={book.photo ? `/${book.photo}` : ''} alt="book" /></td>
            <td>
                <Button variant="info" as={Link} to={`/admin/books/edit/${book._id}`}>Edit</Button>
                <Button variant="danger" onClick={() => deleteBook(book._id)}>Delete</Button>
            </td>
        </tr>
    )
}

export default BookRow