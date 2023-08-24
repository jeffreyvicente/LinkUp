import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import logo from '../logo.png';

function LoginLanding() {
    return (
        <Container fluid className="login-landing">
            <div className="logo-section">
                <img src={logo} alt="LinkUp Logo" className="app-logo"/>
                <h1 className='landing-name'>LinkUp</h1>
            </div>
            <p className="p-landing">To continue further,</p>
            <Button variant="primary" className='landing-button'>Login or Sign Up</Button>
        </Container>
    );
}

export default LoginLanding;