import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../logo.png';

function Navigation() {
    return (
        <Navbar expand="lg" className="Navigation">
            <Container>
                <Navbar.Brand href="#home" className="brand-color">
                <img
              alt="LinkUp Logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            LinkUp</Navbar.Brand>
                <Nav.Link href="#login" className="NavLink">Login | Sign Up</Nav.Link>
            </Container>
        </Navbar>
    );
}

export default Navigation;