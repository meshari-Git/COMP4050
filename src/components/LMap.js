/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "../assets/css/lmap.css"

const center = {
    lat: -33.7738,
    lng: 151.1126
};

const LMap = () => {
    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={true} dragging={true} zoomControl={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-33.7738, 151.1126]}>
                <Popup>
                    Billy Jane's Favour
                </Popup>
            </Marker>
            <Marker position={[-33.7773, 151.1211]}>
                <Popup>
                    I have a problem with my couch
                </Popup>
            </Marker>
            <Marker position={[-33.7746, 151.0788]}>
                <Popup>
                    jdfjhssf
                </Popup>
            </Marker>
            <Marker position={[-33.7546, 151.1130]}>
                <Popup>
                    myJob
                </Popup>
            </Marker>
            <Marker position={[-33.7495, 151.0646]}>
                <Popup>
                    Posting a New Job
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default LMap