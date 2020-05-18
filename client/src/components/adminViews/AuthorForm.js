import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import axios from 'axios'
import authorSchema from '../../schemas/authorSchema'
import _ from 'lodash'
import WithAdminHeaders from '../../HOC/WithAdminHeaders'
import { Row, Col, Divider } from 'antd';
import Error from '../ui_components/Error'
import styles from "./formContainer.module.css"

function AuthorForm(props) {
    const [author, setAuthor] = useState({
        firstname: "",
        lastname: "",
        dob: new Date(),
        authorImage: ""
    })
    const [editingId, setEditingId] = useState("")
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const { match: { params: { authorId } } } = props
        if (authorId) {
            setEditingId(authorId);
            axios.get(`/admin/authors/${authorId}`).then(res => setAuthor(res.data)).catch(err => console.log(err))
        }
    }, [])

    const handleChange = event => {
        const { name, value } = event.target
        setAuthor({ ...author, [name]: value })
    }
    const handleDateChange = date => {
        setAuthor({ ...author, dob: date })
    }

    const handleFileChange = event => {
        setAuthor({ ...author, "authorImage": event.target.files[0] })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            //--------------//validating form//---------//
            const customAuthorSchema = authorSchema(editingId)
            const cleanedData = customAuthorSchema.clean({ ...author, authorImage: _.get(author, 'authorImage.name') })
            customAuthorSchema.validate(cleanedData);
            //--------------//creating validated form//---------//            
            const formData = new FormData()
            formData.append("firstname", author.firstname)
            formData.append("lastname", author.lastname)
            formData.append("dob", author.dob)
            formData.append("authorImage", author.authorImage)
            //--------------//sending validated form//---------//
            if (editingId) {
                axios.patch(`/admin/authors/${editingId}`, formData)
                    .then(res => { props.history.push('/admin/authors') })
                    .catch(err => { console.log(err) })
            } else {
                axios.post('/admin/authors', formData).then(res => { props.history.push('/admin/authors') }).catch(err => { console.log(err) })
            }
        } catch (error) {
            setErrors(error.details.reduce((agg, e) => ({ ...agg, [e.name]: e.message }), {}));
        }
    }
    return (
        <>
            <Divider><h2>{editingId ? "Edit Author" : "Add Author"}</h2></Divider>
            <Row justify="center" >
                <Col className={styles.form_container}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" name="firstname" value={author.firstname} onChange={handleChange} />
                            {errors.firstname && <Error error={errors.firstname} />}
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name" name="lastname" value={author.lastname} onChange={handleChange} />
                            {errors.lastname && <Error error={errors.lastname} />}
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>Author Image</Form.Label>
                            {author.photo ? <img style={{ width: 100, height: 100 }} src={`/${author.photo}`} alt="author" /> : ""}
                            <Form.File
                                id="authorImage"
                                label="Upload Author Image"
                                name="authorImage"
                                onChange={handleFileChange}
                                custom
                            />
                            {errors.authorImage && <Error error={errors.authorImage} />}
                        </Form.Group>
                        <Form.Group controlId="formDOB">
                            <Form.Label>Date of Birth</Form.Label><br />
                            <DatePicker
                                value={new Date(author.dob)}
                                onChange={handleDateChange}
                                name="dob"
                                dateFormat="MM/dd/yyyy"
                            />
                            {errors.dob && <Error error={errors.dob} />}
                        </Form.Group>
                        <Row justify="center">
                            <Button style={{ width: "10vw" }} variant="success" type="submit">
                                {editingId ? "Edit Author" : "Add Author"}
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>

        </>
    )
}

export default WithAdminHeaders(AuthorForm)
