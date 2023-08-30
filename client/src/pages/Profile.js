import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Landing from '../components/Landing';


import { QUERY_USER, QUERY_ME } from '../utils/queries';

  import Auth from '../utils/auth'; 

export default function Profile() {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);


   
    const CreateEventClick = () => {
       
        console.log("Create button clicked");
        
    };

    
    //Logic to grab user and user events

    const {username: userParam} = useParams();

   
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: userParam },
      });
      
      const user = data?.user || {};
    
  console.log("Test: " + user.userName);

    console.log("Test: " + user.fullName);

    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/me" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user?.username) {
        return (
            <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
        );
    }


    //The moon is just like sun, it is big!
    // console.log(user.thoughts[0].thoughtText);

    



   
 


    
    return(
        <Container fluid className='profile-container'>
        <div className='profileBody container p-3'>


            <div className="container">
                <div className="row">

                    <div className="col-sm-4">
                        <h1>My Events</h1>
                        
                        <div className='profileInfo pt-2'>
                            <h3>Name: NamePlace Holder</h3>
                            <p>Email:  Email Placeholder</p>
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
                                <Form.Control type="text" placeholder="Enter event title" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>RSVP Cost</Form.Label>
                                <Form.Control type="number" placeholder="Enter cost" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter description" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose} className='modal-button'>
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