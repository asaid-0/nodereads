import React, { useState, useEffect } from 'react'
import { Container, Row, Table ,Button } from 'react-bootstrap';
import axios from 'axios'
import AuthorRow from './AuthorRow';
import { Link } from 'react-router-dom';
import WithAdminHeaders from '../../HOC/WithAdminHeaders'
import styles from './table.module.css'

function AdminAuthors({setSelectedKeys}) {
    const [authors, setAuthors] = useState([]);

    ////// add sppinner
    useEffect(() => {
        setSelectedKeys(['2'])
        axios.get('/admin/authors')
            .then(res => {
                setAuthors(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    const deleteAuthor = (id)=>{
        axios.delete(`/admin/authors/${id}`)
        .then(res=>{
            setAuthors(authors.filter(auther=>auther._id!==id))
            console.log(
                res.data.firstname + "deleted"
            );
        })
        .catch(err=>console.log(err))
    }

    return (
        <Container fluid>
             <Row className="justify-content-md-center"><h2>Authors List</h2></Row>
                <Row><Button style={{marginBottom:'10px'}} variant="success" as={Link} to="/admin/authors/add" >+ Add Author</Button> </Row>
            <Row>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.length > 0 ?
                            authors.map((author, index) => {
                                return <AuthorRow author={author} index={index} key={index} deleteAuthor={deleteAuthor} />
                            }) :
                            <tr>
                                <td colSpan={6}>No Authors</td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default WithAdminHeaders(AdminAuthors)
