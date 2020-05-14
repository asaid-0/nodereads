import React, { useState } from 'react';
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
            <Navbar variant="dark" style={{ backgroundColor: "#001529" }}>
                <Navbar.Brand as={Link} to="/">NodeReads</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home" >  Home </Nav.Link>
                    <Nav.Link as={Link} to="/books">Books</Nav.Link>
                    <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                    <Nav.Link as={Link} to="/authors">Authors</Nav.Link>
                    <Nav.Link as={Link} to="/authors">{searchInput}</Nav.Link>
                </Nav>
                <Form inline onSubmit={handleSubmit}>
                    <FormControl type="text" value={searchInput} onChange={handleChange} placeholder="Search" className="mr-sm-2" />
                    <input variant="outline-info" type="submit" value="Search" />
                </Form>
            </Navbar>
        </>
    )
}
