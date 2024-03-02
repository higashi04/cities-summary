import React, { useState, useEffect, } from "react";
import ReactMapGl from "react-map-gl";

import 'mapbox-gl/dist/mapbox-gl.css';
import MapMarker from "./MapMarker";

const MapBio = ({ lng = 0, lat = 0 }) => {
  const [map, setMap] = useState(null);
  const [lngValue, setLngValue] = useState(lng);
  const [latValue, setLatValue] = useState(lat);

  useEffect(() => {
    console.log(lng + ", " + lat)
    setLatValue(lat);
    setLngValue(lng);
  }, [lng, lat]);

  useEffect(() => {
    if (map) {
      map.flyTo({ center: [lngValue, latValue] });
    }
  }, [map, lngValue, latValue]);

  const handleViewportChange = (viewport) => {
    setLngValue(viewport.longitude);
    setLatValue(viewport.latitude);
  };

 

  return (
    <>
      <ReactMapGl
      latitude={latValue}
      longitude={lngValue}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        mapStyle={process.env.REACT_APP_MAP_STYLE}
        width="100%"
        height="50%"
        zoom={5}
        transitionDuration="500"
        onViewportChange={handleViewportChange}
        ref={(el) => setMap(el)}
        interactive={false}
      >
        <MapMarker lat={latValue} lng={lngValue} />

      </ReactMapGl>
    </>
  );
};

export default MapBio;
