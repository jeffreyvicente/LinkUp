import React, { useState, useEffect } from 'react';

// Bing Maps API key
const BING_MAPS_API_KEY = 'AnThblU6oaWIN9M7YsddfTJEBbciCOrNN5ATHHNagXsm_o3mmwdFJEVAXpLN-_xK';



const MapSection = ({locationDataParse}) => {
  const latitude = locationDataParse.lat;
  
  console.log("Bing latitude: " + latitude);
  //console.log("Bing latitude: " + latitude.lon);




  

  useEffect(() => {
    // Initialize the map once the Bing Maps script is loaded
    const initMap = () => {
      const map = new window.Microsoft.Maps.Map('#mapContainer', {
        credentials: BING_MAPS_API_KEY
      });

  

      // Define the location for the pushpin
      const location = new window.Microsoft.Maps.Location(locationDataParse.lat,locationDataParse.lon); // Seattle, WA

      // Create the pushpin
      const pushpin = new window.Microsoft.Maps.Pushpin(location, {
        title: 'Event Location',
        text: 'A',
        color: 'red'
      });

      // Add the pushpin to the map
      map.entities.push(pushpin);

      map.setView({ center: location });
    };

    // Attach the initMap function to the global scope
    window.initMap = initMap;

    // Load the Bing Maps script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = `https://www.bing.com/api/maps/mapcontrol?callback=initMap&key=${BING_MAPS_API_KEY}`;
    
    
    script.onerror = function(event) {
      console.error('Script error occurred:', event);
      event.preventDefault(); // Prevent the browser's default error handling
    };
    
    
    document.body.appendChild(script);

    // Clean up
    return () => {
      document.body.removeChild(script);
      delete window.initMap;
    };
  }, [locationDataParse]);

  return <div id="mapContainer" style={{ width: '100%', height: '400px' }} />;
};

export default MapSection;
