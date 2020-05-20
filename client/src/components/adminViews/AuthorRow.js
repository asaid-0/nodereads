import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone'
import {
    EditFilled,
    DeleteFilled,
} from '@ant-design/icons';


function AuthorRow({ author, index, deleteAuthor }) {
    return (
        <tr>
            <td>{index + 1}</td>
            <td><img style={{ width: 100, height: 100 }} src={author.photo ? `/${author.photo}` : ''} alt="author" /></td>
            <td>{author.firstname}</td>
            <td>{author.lastname}</td>

            {/* <td>{new Date(author.dob).toISOString().slice(0, 10)}</td> */}
            <td>{moment.utc(new Date(author.dob), 'YYYY-MM-DD')
                .tz("Africa/Cairo")
                .format('ll')}</td>
            <td>
                <Button variant="info" as={Link} to={`/admin/authors/edit/${author._id}`} ><EditFilled style={{ fontSize: '20px' }}/> </Button><br/>
                <Button variant="danger" onClick={() => deleteAuthor(author._id)}><DeleteFilled style={{ fontSize: '20px' }}/></Button>
            </td>
        </tr>
    )
}

export default AuthorRow
