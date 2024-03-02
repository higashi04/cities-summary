import React, {useState, useEffect} from 'react'
import { Marker } from "react-map-gl";

import { FaMapPin } from "react-icons/fa";
const MapMarker = ({ lat, lng }) => {
    const [latValue, setLatValue] = useState(lat);
    const [lngValue, setLngValue] = useState(lng);

    useEffect(() => {
        console.log(lng + ", " + lat)
        setLatValue(lat)
        setLngValue(lng)
    }, [lat, lng])
  return (
    <div>
        { latValue }, { lngValue }
        <Marker latitude={latValue} longitude={lngValue}> <FaMapPin/> </Marker>
    </div>
    
  )
}

export default MapMarker
