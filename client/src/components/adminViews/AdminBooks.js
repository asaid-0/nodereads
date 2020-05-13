<<<<<<< HEAD
import React, {useState, useEffect} from 'react'
import { Container, Row, Col ,Table} from 'react-bootstrap';
import BookRow from './BookRow'
import axios from 'axios'
=======
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
>>>>>>> 7e85e1974a3b5e4c1c2782c87ddaaf01c56cb51c

function AdminBooks() {
        const [books, setBooks] = useState([]);

        ////// add sppinner
        useEffect(() => {
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
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Photo</th>
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

export default AdminBooks
