import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Landing from '../components/Landing';
import { CREATE_EVENT } from '../utils/mutations';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

  import Auth from '../utils/auth'; 

export default function Profile() {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const [createEvent] = useMutation(CREATE_EVENT);
    const [localUser, setLocalUser] = useState(null);

    const [eventData, setEventData] = useState({
        title: '',
        location: '',
        date: '',
        description: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({
          ...eventData,
          [name]: value
        });
      };

      const handleSubmit = async () => {
        try {
          const { data } = await createEvent({
            variables: {
              ...eventData
            }
          });
          handleClose();
        } catch (err) {
          console.error('Error creating event:', err.networkError.result.errors);
        }
      };
    

    useEffect(() => {
      const storedUserData = localStorage.getItem('user');
      const userObj = storedUserData ? JSON.parse(storedUserData) : null;
      setLocalUser(userObj);
    }, []);

    const { username: userParam } = useParams(); 

    const queryToUse = userParam ? QUERY_USER : QUERY_ME;
    const variablesToUse = userParam ? { username: userParam } : {};
    const { data } = useQuery(queryToUse, {
        variables: variablesToUse,
    }); 

  const user = data?.me || data?.user || {};

    if (!localUser) {
        return <Landing />;
      }

    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/me" />;
    }
    

    return(
        <Container fluid className='profile-container'>
        <div className='profileBody container p-3'>


            <div className="container">
                <div className="row">

                    <div className="col-sm-4">
                        <h1>My Events</h1>
                        
                        <div className='profileInfo pt-2'>
                            <h3>{localUser.username}</h3>
                            <p>{user.email}</p>
                        </div>

                        <div>
                            <Button className="btn btn-primary w-50 event-create" onClick={handleShow}>
                                Create New Event
                            </Button>
                        </div>
                        <Modal show={showModal} onHide={handleClose} className="auth-model">
                    <Modal.Header closeButton closeVariant='white'>
                        <Modal.Title>Create New Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Event Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter event title" name="title" value={eventData.title} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Event Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter address" name="location" value={eventData.location} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Event Date</Form.Label>
                                <Form.Control type="text" placeholder="Enter event date" name="date" value={eventData.date} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={eventData.description} onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSubmit} className='modal-button'>
                            Create Event
                        </Button>
                    </Modal.Footer>
                </Modal>

                    </div>


                    <div className="col-sm-8">
                        <div className= 'currentEventSection'>
                            <h4>My Current Events</h4>
                            <div className="list-group current-events">
                                <button type="button" className="list-group-item list-group-item-action current-event"> Event #1</button>
                                <button type="button" className="list-group-item list-group-item-action current-event"> Event #2</button>
                                <button type="button" className="list-group-item list-group-item-action current-event"> Event #3</button>
                                <button type="button" className="list-group-item list-group-item-action current-event"> Event #4</button>
                                <button type="button" className="list-group-item list-group-item-action current-event"> Event #5</button>
                            </div>
                        </div>
                       
                        <div className= 'pastEventSection pt-3'>
                            <h4>My Past Events</h4>
                            <div className="list-group past-events">
                                <button type="button" className="list-group-item list-group-item-action past-event"> Event #1</button>
                                <button type="button" className="list-group-item list-group-item-action past-event"> Event #2</button>
                                <button type="button" className="list-group-item list-group-item-action past-event"> Event #3</button>
                                <button type="button" className="list-group-item list-group-item-action past-event"> Event #4</button>
                                <button type="button" className="list-group-item list-group-item-action past-event"> Event #5</button>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
        </Container>
    );
}