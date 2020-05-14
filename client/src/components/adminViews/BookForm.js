import React, { useState, useEffect } from 'react'
import { Container, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import Select from 'react-select';

function BookForm(props) {
    const [book, setBook] = useState({
        name: "",
        author: "",
        categories: [],
        bookImage: ""
    })
    const [authors, setAuthors] = useState([])
    const [categories, setCategories] = useState([])
    const [editingId, setEditingId] = useState("")
    const [selectedOptions, setSelectedOptions]= useState([])


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
                const { name , author , categories , photo } = res.data
                //---- set options in category multi select -----//
                setSelectedOptions(categories.map(category=> {return {value: category._id, label: category.name}}))
                //---- map recived categories to match book.categories  -----//
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
        setBook({ ...book, categories: selected.map(element=> element.value ) })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!book.name || !book.author || book.categories.length === 0) return

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
    }
    return (
        <Container fluid>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Book Title" name="name" value={book.name} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Author</Form.Label>
                        <Form.Control as="select" name="author" value={book.author} onChange={handleChange}>
                            {authors.map((author, index) => {
                                return (
                                    <option value={author._id} key={index}>{`${author.firstname} ${author.lastname}`}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>


                    <Select
                        isMulti
                        isClearable
                        styles={{
                            menu: styles => ({ ...styles, zIndex: 999 })
                        }}
                        value={selectedOptions}
                        onChange={handleCategoryChange}
                        options={categories.map(category=>{
                            return (
                                {value: category._id, label: category.name}
                            )
                        })}     
                    />

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
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default BookForm
