import React, {useState, useEffect} from 'react'
import { Container, Row ,Table , Button} from 'react-bootstrap';
import BookRow from './BookRow'
import axios from '../../components/api/axios';
import { Link } from 'react-router-dom';
import WithAdminHeaders from '../../HOC/WithAdminHeaders'
import './table.module.css'



function AdminBooks({setSelectedKeys}) {
        const [books, setBooks] = useState([]);

        ////// add sppinner
        useEffect(() => {
            setSelectedKeys(['1'])
            axios.get('/admin/books')
                .then(res => {
                    setBooks(res.data)
                })
                .catch(err => {
                    console.log(err);
                })
        }, [])
    
    
        const deleteBook = (id)=>{
            axios.delete(`/admin/books/${id}`)
            .then(res=>{
                setBooks(books.filter(book=>book._id!==id))
                console.log(
                    res.data.name + "deleted"
                );
            })
            .catch(err=>console.log(err))
        }
    
        return (
                <Container fluid>
                <Row className="justify-content-md-center"><h2>Books List</h2></Row>
                <Row><Button style={{marginBottom:'10px'}} variant="success" as={Link} to="/admin/books/add" >+ Add Book</Button> </Row>
                <Row>
                    <Table  hover responsive >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Cover</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.length > 0 ?
                                books.map((book, index) => {
                                    return <BookRow book={book} index={index} key={index} deleteBook={deleteBook} />
                                }) :
                                <tr>
                                    <td colSpan={6}>No Books</td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </Row>
                </Container>
        )
}

export default WithAdminHeaders(AdminBooks)
