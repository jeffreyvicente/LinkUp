import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../logo.png';
import AuthModal from './AuthModal';
import personCircle from 'bootstrap-icons/icons/person-circle.svg';
import logoutIcon from 'bootstrap-icons/icons/box-arrow-right.svg';
import loginIcon from 'bootstrap-icons/icons/box-arrow-in-right.svg';
import { Switch, Route, Link } from 'react-router-dom';

function Navigation() {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
          try {
            console.log(JSON.parse(userData));
          
          
            setUser(JSON.parse(userData));
          } catch (error) {
          }
        }
      }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleUserLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleUserLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <Navbar expand="lg" className="Navigation">
            <Container>
                <Navbar.Brand href="/" className="brand-color">
                <img
              alt="LinkUp Logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            LinkUp</Navbar.Brand>
            {
                user ? (
                    <>
                    <a href={`/profiles/${user.username}`} className="NavLink Nav-Username">{user.username} <img src={personCircle} alt="User" width="20" height="16" className='invert-icon'/> </a>
                    <Nav.Link onClick={handleUserLogout} className="NavLink">Logout <img src={logoutIcon} alt="User" width="20" height="16" className='invert-icon'/></Nav.Link>
                    </>
                ) : ( 
                    <Nav.Link onClick={handleOpenModal} className="NavLink">Login | Sign Up <img src={loginIcon} alt="User" width="20" height="16" className='invert-icon'/></Nav.Link>
                )
            }
            </Container>
            <AuthModal show={showModal} handleClose={handleCloseModal} onUserLogin={handleUserLogin} />
        </Navbar>
    );
}

export default Navigation;