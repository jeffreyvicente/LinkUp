import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import logo from '../logo.png';
import AuthModal from './AuthModal';

function LoginLanding() {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
   
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
          try {
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

    return (
        <Container fluid className="login-landing">
            <div className="logo-section">
                <img src={logo} alt="LinkUp Logo" className="app-logo"/>
                <h1 className='landing-name'>LinkUp</h1>
            </div>
            <p className="p-landing">To continue further,</p>
            <Button onClick={handleOpenModal} variant="primary" className='landing-button'>Login or Sign Up</Button>
            <AuthModal show={showModal} handleClose={handleCloseModal} onUserLogin={handleUserLogin} />
        </Container>
        
    );
}

export default LoginLanding;