import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';


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
            <Navbar variant="dark" className={styles.navbar}>
                <Navbar.Brand as={Link} to="/" >
                    <img src="/images/nodejs-logo.png" alt="logo" className={styles.logo} />
                    <span className={styles.title}>Reads</span></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home" className={styles.link} >  Home </Nav.Link>
                    <Nav.Link as={Link} to="/books" className={styles.link}>Books</Nav.Link>
                    <Nav.Link as={Link} to="/categories" className={styles.link}>Categories</Nav.Link>
                    <Nav.Link as={Link} to="/authors" className={styles.link}>Authors</Nav.Link>
                    <Nav.Link as={Link} to="/authors" className={styles.link}>{searchInput}</Nav.Link>
                </Nav>
                <Form inline onSubmit={handleSubmit}>
                    <FormControl type="text" value={searchInput} onChange={handleChange} placeholder="Search" className="mr-sm-2" />
                    <Link to={`/home/search/${searchInput}`}>
                        <input variant="outline-info" type="submit" value="Search" />
                    </Link>
                </Form>
            </Navbar>
        </>
    )
}
