import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { Layout, Row, Col } from "antd";
import axios from '../../components/api/axios';
import WithUserHeaders from '../../HOC/WithUserHeaders'
import AuthorCard from './AuthorCard'

function Authors() {

    const [authors, setAuthors] = useState([])

    useEffect(() => {
        async function fetchAuthors() {
            const result = await axios.get('/authors/')
            if (result.data) {
                setAuthors(result.data.data)
            } else {
                console.log("something went wrong")
            }
        }
        fetchAuthors();
    }, []);

    return (

        <Layout style={{ height: "90vh", overflow: "auto" }}>
            <Container>
                <br />
                <h2>Authors</h2>
                <Row justify="space-around" style={{ height: "100%" }} >
                    {
                        authors.length ? authors.map((author) =>
                            <Col key={author._id} className="col-12 col-md-4" style={{ margin: '10px', textAlign: 'center' }} >
                                <AuthorCard author={author} />
                            </Col>
                        ) :
                            <h2>No Authors</h2>
                    }
                </Row>
            </Container>
        </Layout>

    )
}

export default WithUserHeaders(Authors)
