import React, { useState, useEffect }from 'react'
import WithUserHeaders from '../../HOC/WithUserHeaders'
import { Container, Row, Col } from 'react-bootstrap';
import axios from '../../components/api/axios';

function Author(props){
    const { match: { params: { authorId } } } = props;
    const [author, setAuthor] = useState({})
    const [books, setBooks] = useState([])

    useEffect(()=>{
        axios.get(`/authors/${authorId}`)
        .then(res => {
            setAuthor(res.data.author)
            setBooks(res.data.books)
        })
        .catch(err => {
            console.log(authorId)
            console.log(err);
        })
    }, [])
    

    return(
        <Container>
            <Row>
                <p>{author.name}</p>
            </Row>
        </Container>
    )
}

export default WithUserHeaders(Author)