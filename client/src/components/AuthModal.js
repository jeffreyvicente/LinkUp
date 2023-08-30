import React, { useState, useRef } from 'react';
import { Modal, Tab, Tabs, Button, Form, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function AuthModal({ show, handleClose, onUserLogin }) {
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();
    const loginFormRef = useRef(null);
  const signUpFormRef = useRef(null);

  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
const [showPasswordSignup, setShowPasswordSignup] = useState(false);

     // Login Form States
     const [userFormData, setUserFormData] = useState({ email: '', password: '' });
     const [validated, setValidated] = useState(false);
     const [showAlert, setShowAlert] = useState(false);
     const [login] = useMutation(LOGIN_USER);
     const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
      };
      const handleFormSubmit = async ({ currentTarget }) => {
        console.log("Login form is being submitted");
        const form = currentTarget;

        if (form.checkValidity() === false) {
            setValidated(true);
          return;
        }
    
        try {
          const { data } = await login({
            variables: { email: userFormData.email, password: userFormData.password },
          });
    
          Auth.login(data.login.token);
          onUserLogin(data.login.user);
          handleClose();
          navigate('/');
        } catch (err) {
          console.error(err);
          setShowAlert(true);
        }
    
        setUserFormData({
          username: '',
          email: '',
          password: '',
        });
      };
    
  // Form States for Signup
  const [userFormDataSignUp, setUserFormDataSignUp] = useState({ fullName: '', username: '', email: '', password: '' });
  const [createUser] = useMutation(CREATE_USER);
  const handleInputChangeSignUp = (event) => {
    const { name, value } = event.target;
    setUserFormDataSignUp({ ...userFormDataSignUp, [name]: value });
  };
  const handleFormSubmitSignUp = async ({ currentTarget }) => {
    const form = currentTarget;

    console.log("Signup form is being submitted");
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      const { data } = await createUser({
        variables: { 
          fullName: userFormDataSignUp.fullName, 
          username: userFormDataSignUp.username,
          email: userFormDataSignUp.email, 
          password: userFormDataSignUp.password 
        },
      });

      Auth.login(data.createUser.token);
      onUserLogin(data.createUser.user);
      handleClose();
      navigate('/');
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormDataSignUp({
      fullName: '',
      username: '',
      email: '',
      password: '',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handle Submit is being triggered");
    if (activeTab === 'login' && loginFormRef.current) {
      handleFormSubmit({ currentTarget: loginFormRef.current });
    } else if (activeTab === 'signup' && signUpFormRef.current) {
      handleFormSubmitSignUp({ currentTarget: signUpFormRef.current });
    }
  };

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
                    <Form noValidate validated={validated} onSubmit={handleFormSubmit} ref={loginFormRef}>
                    <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong with your login credentials!
                    </Alert>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" name='email' onChange={handleInputChange} value={userFormData.email} required />
                            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label className="form-label">Password</Form.Label>
                            <Form.Control type={showPasswordLogin ? 'text' : 'password'} placeholder="Password" name='password' value={userFormData.password} onChange={handleInputChange} required />
                            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                            <Button variant="secondary" className='show-hide' onClick={() => setShowPasswordLogin(!showPasswordLogin)}>
                            {showPasswordLogin ? 'Hide' : 'Show'}
                            </Button>
                        </Form.Group>
                    </Form>
                </Tab>
                <Tab eventKey="signup" title="Sign Up">
                    <Form noValidate validated={validated} onSubmit={handleFormSubmitSignUp} ref={signUpFormRef} className='signup-section'>
                    <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong with your signup!
                    </Alert>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Full Name" name="fullName" onChange={handleInputChangeSignUp} value={userFormDataSignUp.fullName} required />
                        <Form.Control.Feedback type='invalid'>Name is required!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="usernameSignup">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Choose Username" name='username' onChange={handleInputChangeSignUp} value={userFormDataSignUp.username} required />
                        <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="emailSignup">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" name='email' onChange={handleInputChangeSignUp} value={userFormDataSignUp.email} required />
                            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                        </Form.Group>
                    <Form.Group controlId="passwordSignup">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={showPasswordSignup ? 'text' : 'password'} placeholder="Choose Password" name='password' onChange={handleInputChangeSignUp} value={userFormDataSignUp.password} required />
                        <Button variant="secondary" className='show-hide' onClick={() => setShowPasswordSignup(!showPasswordSignup)}>
                        {showPasswordSignup ? 'Hide' : 'Show'}
                        </Button>
                        <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                    </Form.Group>
                    </Form>
                </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer className='modal-footer'>
                <Button className='modal-button' onClick={handleSubmit}>
                    {activeTab === 'login' ? 'Login' : 'Sign Up'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AuthModal;