import React, { useEffect } from 'react';

// Bing Maps API key
const BING_MAPS_API_KEY = 'YOUR_BING_MAPS_API_KEY';

const MapSection = () => {
  useEffect(() => {
    // Initialize the map once the Bing Maps script is loaded
    const initMap = () => {
      const map = new window.Microsoft.Maps.Map('#mapContainer', {
        credentials: BING_MAPS_API_KEY
      });

      // Define the location for the pushpin
      const location = new window.Microsoft.Maps.Location(47.6062, -122.3321); // Seattle, WA

      // Create the pushpin
      const pushpin = new window.Microsoft.Maps.Pushpin(location, {
        title: 'Hello',
        subTitle: 'Bing Maps Pushpin',
        text: 'A',
        color: 'red'
      });

      // Add the pushpin to the map
      map.entities.push(pushpin);
    };

    // Attach the initMap function to the global scope
    window.initMap = initMap;

    // Load the Bing Maps script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = `https://www.bing.com/api/maps/mapcontrol?callback=initMap&key=${BING_MAPS_API_KEY}`;
    document.body.appendChild(script);

    // Clean up
    return () => {
      document.body.removeChild(script);
      delete window.initMap;
    };
  }, []);

  return <div id="mapContainer" style={{ width: '100%', height: '400px' }} />;
};

export default MapSection;
