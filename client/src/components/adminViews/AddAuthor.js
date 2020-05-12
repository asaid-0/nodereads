import React, { useState, useEffect } from 'react'
import { Container, Row, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

import axios from 'axios'

function AddAuthor() {
    const [author, setAuthor] = useState({
        firstname: "",
        lastname: "",
        dob: new Date(),
        authorImage: ""
    })

    const handleChange = event => {
        const { name, value } = event.target
        setAuthor({ ...author, [name]: value })
    }
    const handleDateChange = date => {

        setAuthor({ ...author, dob: date })
        console.log(author.dob);
    }

    const handleFileChange = event => {
        setAuthor({ ...author, "authorImage": event.target.files[0] })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!author.firstname || !author.lastname || !author.dob) return
        const formData = new FormData()
        formData.append("firstname", author.firstname)
        formData.append("lastname", author.lastname)
        formData.append("dob", author.dob)
        formData.append("authorImage", author.authorImage)

        axios.post('/admin/authors', formData).then(res => {console.log(res)}).catch(err => { console.log(err) })
    }
    return (
        <Container fluid>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" name="firstname" value={author.firstname} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" name="lastname" value={author.lastname} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formImage">
                        <Form.File
                            id="authorImage"
                            label="Upload Author Image"
                            name="authorImage"
                            onChange={handleFileChange}
                            custom
                        />
                    </Form.Group>
                    <Form.Group controlId="formDOB">
                        <DatePicker
                            selected={author.dob}
                            onChange={handleDateChange}
                            name="dob"
                            dateFormat="MM/dd/yyyy"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            </Row>
        </Container>
    )
}

export default AddAuthor
