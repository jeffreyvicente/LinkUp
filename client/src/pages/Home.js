import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../logo.png';
import { Link } from 'react-router-dom';

function Home() {
    const events = [
       {
        title: "Placeholder Event Name",
        description: "This is a placeholder for a short description.",
        cost: "free"
       },
       {
        title: "Placeholder Event Name 2",
        description: "This is a placeholder for a short description.",
        cost: "$30"
       },
       {
        title: "Placeholder Event Name 3",
        description: "This is a placeholder for a short description.",
        cost: "$100"
       },
       {
        title: "Placeholder Event Name 4",
        description: "This is a placeholder for a short description.",
        cost: "$100"
       },
    ];

    return (
        <Container fluid className="home-container">
            <Row className="justify-content-center mt-4 home-title">
                <Col md="auto">
                <img src={logo} alt="App Logo" className="home-logo"/>
                </Col>
                <Col md="auto">
                    <h1 className='home-h1'>LinkUp</h1>
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <h3 className="home-h3">Click on an event to learn more about it or RSVP.</h3>
            </Row>
            <Row className="justify-content-center mt-4">
            {events.map((event, id) => (
                    <Col md={5} className="mt-3" key={id}>
                    <Link to={`/event/${id}`} className="home-events-link">
                    <div className="home-events">
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                    <h5>{event.cost}</h5>
                    </div>
                    </Link>
                    </Col>    
            ))}
            </Row> 
        </Container>
    );
}

export default Home;