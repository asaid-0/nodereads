import React from 'react'
import { Button } from 'react-bootstrap';
function AuthorRow({ author, index , deleteAuthor}) {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{author.firstname}</td>
            <td>{author.lastname}</td>
            <td>{author.dob}</td>
            <td><img style={{ width: 200, height: 200 }} src={author.photo ? `/${author.photo}` : ''} alt="author" /></td>
            <td>
                <Button variant="info">Edit</Button>
                <Button variant="danger" onClick={()=>deleteAuthor(author._id)}>Delete</Button>
            </td>
        </tr>
    )
}

export default AuthorRow
