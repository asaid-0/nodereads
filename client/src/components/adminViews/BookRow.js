import React from 'react'
import { Button , Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    EditFilled,
    DeleteFilled,
} from '@ant-design/icons';

function BookRow({ book, index, deleteBook }) {
    return (
        <tr>
            <td>{index + 1}</td>
            <td><img style={{ width: 100, height: 100 }} src={book.photo ? `/${book.photo}` : ''} alt="book" /></td>
            <td>{book.name}</td>
            <td>{book.author.firstname}</td>
            <td>{book.categories.map((cat,index)=><h5  key={index}><Badge pill variant="warning"> {cat.name} </Badge></h5>)}</td>
            <td>
                <Button variant="info" as={Link} to={`/admin/books/edit/${book._id}`} style={{marginRight:"0.2rem"}} ><EditFilled style={{ fontSize: '20px' }} /></Button>
                <Button variant="danger" onClick={() => deleteBook(book._id)}><DeleteFilled style={{ fontSize: '20px' }} /></Button>
            </td>
        </tr>
    )
}

export default BookRow