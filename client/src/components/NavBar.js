import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function NavBar() {
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
        setSearchInput(e.target.value);
    }
    const handleSubmit = (e) => {
        console.log(searchInput);
        e.preventDefault();
        console.log(searchInput);
    }
    return (
        <>
            <Navbar variant="dark" className={styles.navbar}>
                <Navbar.Brand as={Link} to="/">NodeReads</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home" className={styles.link} >  Home </Nav.Link>
                    <Nav.Link as={Link} to="/books" className={styles.link}>Books</Nav.Link>
                    <Nav.Link as={Link} to="/categories" className={styles.link}>Categories</Nav.Link>
                    <Nav.Link as={Link} to="/authors" className={styles.link}>Authors</Nav.Link>
                    <Nav.Link as={Link} to="/authors" className={styles.link}>{searchInput}</Nav.Link>
                </Nav>
                <Form inline onSubmit={handleSubmit}>
                    <FormControl type="text" value={searchInput} onChange={handleChange} placeholder="Search" className="mr-sm-2" />
                    <input variant="outline-info" type="submit" value="Search" />
                </Form>
            </Navbar>
        </>
    )
}
