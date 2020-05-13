import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

function AdminBooks() {
    return (
        <Container fluid>
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}><h1>Admin books</h1></Col>
            </Row>
        </Container>)
}

export default AdminBooks
