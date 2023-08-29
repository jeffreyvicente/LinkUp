import React, { useState } from 'react';
import BingMaps from '../components/Map'
import Container from 'react-bootstrap/Container';


import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_EVENT } from '../utils/queries';

const Events = () => {
    
   
    const donateClick = () => {
        console.log("Donate button clicked");     
    };

    const rsvpClick = () => {
        console.log("Attend button clicked");
    };

     
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };



    //Map Logic 

    const location = {
        lat: 47.6062,
        long: -122.3321
      };
    
    return (
        


        <Container fluid className="events-container">

            <div className ="eventHeader m-2 ">
                <h1 className="eventName">Title: </h1>
                <h4 className="eventDate ">Date: </h4>
                <h5 className="eventLocation ">Location: </h5>
            </div>
            

            <div className="container pt-5">
                <div className="row">
                    <div className="col-8">
                         
                        <div className ="detailsSection">
                        <h4 className="text-left">Details</h4>
                            <p>700 people attending</p>
                            <p>Event Hosted By  </p>
                            <p> description : 
                                
                            </p>
                        </div>

                        <div className='detailButtonDiv text-center'>
                            <input className="btn btn-primary w-25 rsvp-button" type="button" value="RSVP" onClick={openModal}/>
                        </div>
                        
                        

                    </div>
                    <div className="col-4">

                        <h4 className="text-left">Donate</h4>
                        <p>Chip in to help fund this event:</p>
                        <div>
                            <input className="btn btn-primary w-100 donate-button" type="button" value="Donate" onClick={donateClick}/>
                        </div>
                        <div className = "mapSection mt-3">
                            <BingMaps location = {location}/>



                        </div>
                        

                    </div>
                   
                </div>
            </div>


            {/* Pop up modal when a user RSVPs */}
            <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="rsvp-modal-header">
                            <h5 className="modal-title">Thanks for RSVPing to the event</h5>
                            
                        </div>
                       
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary modal-close" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            
        </Container>


    );


};

export default Events;
