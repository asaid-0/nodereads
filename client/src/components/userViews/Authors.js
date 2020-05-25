import React, { useState, useEffect }from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import axios from '../../components/api/axios';
import WithUserHeaders from '../../HOC/WithUserHeaders'
import AuthorCard from './AuthorCard'

function Authors() {

    const [authors, setAuthors] = useState([])

    useEffect(() => {
        async function fetchAuthors() {
            const result = await axios.get('/authors')
            if(result.data){
                setAuthors(result.data.data)
            }else{
                console.log("something went wrong")
            }
        }
        fetchAuthors();
      }, []);

    return (
        <div>
            <h1>Authors</h1>
            <Row>
                {
                    authors.length ? authors.map((author) => 
                        <Col key={author._id} className="col-12 col-md-4" style={{margin:'10px', textAlign: 'center'}} >
                            <AuthorCard author={author}/>
                        </Col>
                    ) :
                    <h2>No Authors</h2>
                }
            </Row>
        </div>
    )
}

export default WithUserHeaders(Authors)
