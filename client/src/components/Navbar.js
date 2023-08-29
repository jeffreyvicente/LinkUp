import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../logo.png';
import AuthModal from './AuthModal';

function Navigation() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

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
                <Nav.Link onClick={handleOpenModal} className="NavLink">Login | Sign Up</Nav.Link>
            </Container>
            <AuthModal show={showModal} handleClose={handleCloseModal} />
        </Navbar>
    );
}

export default Navigation;