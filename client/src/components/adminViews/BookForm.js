import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'
import Select from 'react-select';
import bookSchema from '../../schemas/bookSchema'
import _ from 'lodash'
import WithAdminHeaders from '../../HOC/WithAdminHeaders'
import 'antd/dist/antd.css';
import { Row, Col ,Divider } from 'antd';
import Error from '../Error'
import  styles  from "./formContainer.module.css"

function BookForm(props) {
    // const [{book,authors,categories,edit}, setState] = useReducer((oldState, newState) => ({ ...oldState, ...newState }), { book:{} , authors:[]});
    const [book, setBook] = useState({
        name: "",
        author: "",
        categories: [],
        bookImage: ""
    })
    const [authors, setAuthors] = useState([])
    const [categories, setCategories] = useState([])
    const [editingId, setEditingId] = useState("")
    const [selectedOptions, setSelectedOptions] = useState([])
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const { match: { params: { bookId } } } = props


        axios.get('/admin/authors')
            .then(res => {
                setAuthors(res.data)
            })
            .catch(err => {
                console.log(err);
            })
        axios.get('/admin/categories')
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => {
                console.log(err);
            })
        if (bookId) {
            setEditingId(bookId);
            axios.get(`/admin/books/${bookId}`).then(res => {
                const { name, author, categories, photo } = res.data
                //---- set options in category multi select -----//
                const selectedCategories = categories.map(category =>({ value: category._id, label: category.name  }))
                setSelectedOptions(selectedCategories)
                //---- map received categories to match book.categories  -----//
                const categoriesIds = categories.map(category => category._id)

                setBook({ ...book, name: name, author: author._id, categories: categoriesIds, photo: photo })
            }).catch(err => console.log(err))
        }
    }, [])

    const handleChange = event => {
        const { name, value } = event.target
        setBook({ ...book, [name]: value })
    }

    const handleFileChange = event => {
        setBook({ ...book, "bookImage": event.target.files[0] })
    }

    const handleCategoryChange = selected => {
        //---- to control multi select input -----//
        setSelectedOptions(selected)

        //---- set book.categories by mapping selected values -----//
        if (selected) setBook({ ...book, categories: selected.map(element => element.value) })
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        try {
            //--------------//validating form//---------//
            const customBookSchema = bookSchema(editingId)
            const cleanedData = customBookSchema.clean({...book, bookImage: _.get( book ,'bookImage.name' )})
            customBookSchema.validate(cleanedData);
            //--------------//sending validated form//---------//
            const formData = new FormData()
            formData.append("name", book.name)
            formData.append("author", book.author)
            formData.append("categories", JSON.stringify(book.categories)) //---- using json.stringify to send array through formData and parse it at the backend -----//
            formData.append("bookImage", book.bookImage)
    
            if (editingId) {
                axios.patch(`/admin/books/${editingId}`, formData)
                    .then(res => { props.history.push('/admin/books') })
                    .catch(err => { console.log(err) })
            } else {
                axios.post('/admin/books', formData).then(res => { props.history.push('/admin/books') }).catch(err => { console.log(err) })
            }
          } catch (error) {
            setErrors(error.details.reduce((agg,e)=>({...agg, [e.name]:e.message}),{}));
        }
    }
    return (
        <>
            <Divider><h2>{editingId? "Edit Book":"Add Book"}</h2></Divider>
            <Row justify="center">
            <Col className={styles.form_container}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Title</Form.Label>
                        <Form.Control  type="text" placeholder="Enter Book Title" name="name" value={book.name} onChange={handleChange} />
                        {errors.name && <Error error={errors.name}/>}
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Author</Form.Label>
                        <Form.Control as="select" name="author" value={book.author} onChange={handleChange}>
                            <option value="">Select author</option>
                            {authors.map((author, index) => {
                                return (
                                    <option value={author._id} key={index}>{`${author.firstname} ${author.lastname}`}</option>
                                )
                            })}
                        </Form.Control>
                        {errors.author && <Error error={errors.author}/>}
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Categories</Form.Label>
                    <Select
                        placeholder= "Select Categories"
                        name = "categories"
                        isMulti
                        isClearable
                        styles={{
                            menu: styles => ({ ...styles, zIndex: 999 })
                        }}
                        value={selectedOptions}
                        onChange={handleCategoryChange}
                        options={categories.map(category => {
                            return (
                                { value: category._id, label: category.name }
                            )
                        })}
                    />
                    {errors.categories && <Error error={errors.categories}/>}
                    </Form.Group>

                    <Form.Group controlId="formImage">
                        <Form.Label>Book Image</Form.Label>
                        {/* //---- show image when admin edit book -----// */}
                        {book.photo ? <img style={{ width: 100, height: 100 }} src={`/${book.photo}`} alt="book" /> : ""}
                        <Form.File
                            id="bookImage"
                            label="Upload Book Image"
                            name="bookImage"
                            onChange={handleFileChange}
                            custom
                            
                        />
                        {errors.bookImage && <Error error={errors.bookImage}/>}
                    </Form.Group>
                    <Row justify="center">
                    <Button style={{width:"10vw"}}variant="success" type="submit">
                        {editingId? "Edit Book":"Add Book"}
                    </Button>
                    </Row>
                </Form>
                </Col>
            </Row>
            </>
    )
}

export default WithAdminHeaders(BookForm)
