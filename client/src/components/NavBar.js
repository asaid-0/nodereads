import React from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function NavBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/">NodeReads</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home" >  Home  </Nav.Link>
                    <Nav.Link as={Link} to="/books">Books</Nav.Link>
                    <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                    <Nav.Link as={Link} to="/authors">Authors</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        </>
    )
}
