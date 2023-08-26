import React, { useState } from 'react';
import { Modal, Tab, Tabs, Button, Form } from 'react-bootstrap';

function AuthModal({ show, handleClose }) {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <Modal show={show} onHide={handleClose} className="auth-model">
            <Modal.Header closeButton className='modal-header' closeVariant="white">
                <Modal.Title>Login | Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body'>
                <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3 nav-tabs"
                fill
                >
                <Tab eventKey="login" title="Login">
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label className="form-label">Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>
                </Tab>
                <Tab eventKey="signup" title="Sign Up">
                    <Form className='signup-section'>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Full Name" />
                    </Form.Group>
                    <Form.Group controlId="usernameSignup">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Choose Username" />
                    </Form.Group>
                    <Form.Group controlId="passwordSignup">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" placeholder="Choose Password" />
                    </Form.Group>
                    </Form>
                </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer className='modal-footer'>
                <Button className='modal-button'>
                    {activeTab === 'login' ? 'Login' : 'Sign Up'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AuthModal;