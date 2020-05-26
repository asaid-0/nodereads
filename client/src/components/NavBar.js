import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';


export default function NavBar(props) {
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
        setSearchInput(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <Navbar expand="lg" variant="dark" className={styles.navbar}>
                <Navbar.Brand as={Link} to="/" >
                    <img src="/images/nodejs-logo.png" alt="logo" className={styles.logo} />
                    <span className={styles.title}>Reads</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">


                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/home" className={styles.link} >  Home </Nav.Link>
                        <Nav.Link as={Link} to="/books" className={styles.link}>Books</Nav.Link>
                        <Nav.Link as={Link} to="/categories" className={styles.link}>Categories</Nav.Link>
                        <Nav.Link as={Link} to="/authors" className={styles.link}>Authors</Nav.Link>
                    </Nav>

                    <Form inline onSubmit={handleSubmit}>
                        <FormControl type="text" value={searchInput} onChange={handleChange} placeholder="book or author name" className="mr-sm-2" />
                        <Link to={ searchInput ? `/home/search/${searchInput}` : "/home/search/%20"}>
                            <Button className={styles.button} variant="outline-primary">Search</Button>
                        </Link>
                    </Form>
                    <Nav.Link as={Link} onClick={() => { sessionStorage.removeItem('token'); window.location.pathname = "/login" }} className={styles.link} > Logout </Nav.Link>

                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
