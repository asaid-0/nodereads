import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AuthorRow({ author, index , deleteAuthor }) {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{author.firstname}</td>
            <td>{author.lastname}</td>
            <td>{new Date(author.dob).toISOString().slice(0, 10)}</td>
            <td><img style={{ width: 200, height: 200 }} src={author.photo ? `/${author.photo}` : ''} alt="author" /></td>
            <td>
                <Button variant="info" as={Link} to={`/admin/authors/edit/${author._id}`} >Edit</Button>
                <Button variant="danger" onClick={()=>deleteAuthor(author._id)}>Delete</Button>
            </td>
        </tr>
    )
}

export default AuthorRow
