import React, { useState } from 'react';
import BingMaps from '../components/Map'




export default function Events() {
    
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

    
    
    
    
    return (
        


        <div className = "container mt-4 ">

            <div className ="eventHeader m-2 ">
                <h1 className="eventName">TacoCon 2023</h1>
                <h4 className="eventDate ">WEDNESDAY, OCTOBER 18, 2023 AT 8 PM</h4>
                <h5 className="eventLocation ">1 AT&T Way, Arlington, TX 76011</h5>

            </div>
            

            <div className="container pt-5 ">
                <div className="row">
                    <div className="col-8">
                        
                        <h4 className="text-left">Details</h4>  
                        <div className ="detailsSection">
                            <p>700 people attending</p>
                            <p>Event Hosted By Richard Nguyen</p>
                            <p>Join us for the ultimate taco extravaganza at TacoCon 2023, where taco lovers from around the world gather to indulge in the finest flavors, 
                                creative combinations, and culinary innovation that the taco universe has to offer.
                                
                            TacoCon 2023 is not just an event; it's a celebration of all things taco! Whether you're a casual taco enthusiast or a die-hard taco aficionado, 
                            this event promises an unforgettable experience that tantalizes your taste buds and showcases the rich tapestry of taco culture.    
                                
                            </p>
                        </div>

                        <div className='detailButtonDiv text-center'>
                            <input className="btn btn-primary w-25" type="button" value="RSVP" onClick={openModal}/>
                        </div>
                        
                        

                    </div>
                    <div className="col-4">

                        <h4 className="text-left">Donate</h4>
                        <div>
                            <input className="btn btn-primary w-100" type="button" value="Donate" onClick={donateClick}/>
                        </div>
                        <div className = "mapSection mt-3">
                            <BingMaps/>



                        </div>
                        

                    </div>
                   
                </div>
            </div>

            <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thanks for RSVPing to the event</h5>
                            
                        </div>
                       
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            
        </div>


    );


}