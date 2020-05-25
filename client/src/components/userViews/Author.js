import React, { useState, useEffect }from 'react'
import WithUserHeaders from '../../HOC/WithUserHeaders'
import { Container, Row, Col } from 'react-bootstrap';
import axios from '../../components/api/axios';
import AuthorBook from './AuthorBook'

function Author(props){
    const { match: { params: { authorId } } } = props;
    const [author, setAuthor] = useState({})
    const [books, setBooks] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:5000/authors/${authorId}`)
        .then(res => {
            setAuthor(res.data.author)
            setBooks(res.data.books)
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    

    return(
        <Container>
            <Row>
                <h1>{author.firstname} {author.lastname}</h1>
                <br/>
                <h2>Books</h2>  
                {
                    books ? books.map(book => 
                        <Col key={book._id} className="col-12 col-md-4" style={{margin:'10px', textAlign: 'center'}} >
                            <AuthorBook book={book}/>
                        </Col>
                    )
                    : <p>No Books</p>
                }
            </Row>
        </Container>
    )
}

export default WithUserHeaders(Author)