import React, { useState, useEffect } from 'react';
import BingMaps from '../components/Map';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_EVENT } from '../utils/queries';



const Events = () => {
  const [showModal, setShowModal] = useState(false);
  const [locationData, setLocationData] = useState(null);

  function replaceSpacesWithPlus(inputString) {
    return inputString.replace(/ /g, '+');
  }

  const { eventId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    variables: { eventId: eventId },
  });

  const event = data?.event || {};

  console.log("Event: " + event.location)
  const finalEvent = event.location

  useEffect(() => {
    if (event.location) {
      const locationSearch = replaceSpacesWithPlus(finalEvent);
      const fetchURL = "https://geocode.maps.co/search?q=" + locationSearch;
      console.log(fetchURL);

      fetch(fetchURL)
        .then(response => response.json())
        .then(data => {
            console.log("Return data: " + data[0].lat)
          if (data && data.length > 0) {
            const locationLat = data[0].lat;
            const locationLon = data[0].lon;

            const locationData = {
              lat: locationLat,
              lon: locationLon
            };

            setLocationData(locationData);
          } else {
            console.log("Data is empty");
          }
        });
    }
  }, [event.location]);

  console.log(locationData);






  

  const donateClick = () => {
    console.log("Donate button clicked");
  };

  const rsvpClick = () => {
    console.log("Attend button clicked");
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container fluid className="events-container">
      {locationData ? (
        <>
          <div className="eventHeader m-2 text-center">
            <h1 className="eventName">{event.title} </h1>
            <h4 className="eventDate ">{event.date} </h4>
            <h5 className="eventLocation ">{event.location}</h5>
          </div>

          <div className="container pt-5">
            <div className="row">
              <div className="col-8">
                <div className="detailsSection">
                  <h4 className="text-left">Details</h4>
                  <p>700 people attending</p>
                  <p>Event Hosted By: {event.organizer} </p>
                  <p>{event.description} </p>
                </div>

                <div className='detailButtonDiv text-center'>
                  <input className="btn btn-primary w-25 rsvp-button" type="button" value="RSVP" onClick={openModal} />
                </div>
              </div>

              <div className="col-4">
                <h4 className="text-left">Donate</h4>
                <p>Chip in to help fund this event:</p>
                <div>
                  <input className="btn btn-primary w-100 donate-button" type="button" value="Donate" onClick={donateClick} />
                </div>
                <div className="mapSection mt-3">
                  <BingMaps locationDataParse={locationData} />
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
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

export default Events;
