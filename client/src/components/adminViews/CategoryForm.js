import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from '../../components/api/axios';
import categorySchema from '../../schemas/categorySchema'
import WithAdminHeaders from '../../HOC/WithAdminHeaders'
import { Row, Col, Divider } from 'antd';
import Error from '../ui_components/Error'
import styles from "./formContainer.module.css"

function CategoryForm(props) {
    const [category, setCategory] = useState({
        name: "",
    })
    const [editingId, setEditingId] = useState("")
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const { match: { params: { categoryId } } } = props
        if (categoryId) {
            setEditingId(categoryId);
            axios.get(`/admin/categories/${categoryId}`).then(res => setCategory(res.data)).catch(err => console.log(err))
        }
    }, [])

    const handleChange = event => {
        const { name, value } = event.target
        setCategory({ ...category, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            //--------------//validating form//---------//
            const cleanedData = categorySchema.clean(category)
            categorySchema.validate(cleanedData);
            //--------------//creating validated form//---------//            
            const data = {name: category.name}
            //--------------//sending validated form//---------//
            if (editingId) {
                axios.patch(`/admin/categories/${editingId}`, data)
                    .then(res => { props.history.push('/admin/categories') })
                    .catch(err => { console.log(err) })
            } else {
                axios.post('/admin/categories', data).then(res => { props.history.push('/admin/categories') }).catch(err => { console.log(err) })
            }
        } catch (error) {
            setErrors(error.details.reduce((agg, e) => ({ ...agg, [e.name]: e.message }), {}));
        }
    }
    return (
        <>
            <Divider><h2>{editingId ? "Edit Category" : "Add Category"}</h2></Divider>
            <Row justify="center" >
                <Col className={styles.form_container}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formCategoryName">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Category Name" name="name" value={category.name} onChange={handleChange} />
                            {errors.name && <Error error={errors.name} />}
                        </Form.Group>
                        <Row justify="center">
                            <Button style={{ width: "10vw" }} variant="success" type="submit">
                                {editingId ? "Edit Category" : "Add Category"}
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>

        </>
    )
}

export default WithAdminHeaders(CategoryForm)
